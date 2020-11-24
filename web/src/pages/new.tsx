import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Input from "../components/Input";
import { AuthContext } from "../contexts/auth";
import api from "../services/api";

interface FormInputs {
  title: string
  text: string
}

interface Tag {
  id: number
  name: string
}

export default function New({ tags }) {
  const router = useRouter()
  const { state, logOut } = useContext(AuthContext)
  const { register, handleSubmit } = useForm<FormInputs>()
  const [selectTags, setSelectTags] = useState([])
  const [message, setMessage] = useState("")

  const onSubmit = async (data: FormInputs) => {
    if (!state.signed) {
      return setMessage("Ao que parece você deveria estar identificado para publicar.")
    }

    if (selectTags.length === 0) {
      return setMessage("Tu deves escolher uma categoria para essa publicação.")
    }

    const response = await api.post("/posts/create", {
      title: data.title,
      text: data.text,
      tags: selectTags
    }, {
      headers: {
        Authorization: `Bearer ${state.token}`
      }
    })

    if (response.status !== 201) {
      return setMessage("Ocorreu um erro.")
    }

    router.push("/")
  }

  const onChange = (event) => {
    if (selectTags.length === 3) {
      return setMessage("Limit de tags atingido")
    }

    const el = event.target
    const value = parseInt(el.options[el.selectedIndex].id)

    if (selectTags.indexOf(value) > -1) {
      return setMessage("Está tag já foi adicionada")
    }
    setSelectTags([...selectTags, value])
  }

  const onClick = (event, id) => {
    setSelectTags(selectTags.filter(tag => tag !== id))
  }

  return (
    <main>
      <Head>
        <title>
          Távola Redonda - Novo Post
        </title>
      </Head>
      <Header />
        <Container className="mb-5">
          {message && (
            <Alert variant="danger" className="w-75 m-auto text-center">
              {message}
            </Alert>
          )}
          <Form className="m-auto w-75 bg-danger border border-dark rounded p-2 text-center" onSubmit={handleSubmit(onSubmit)}>
            <h1>Nova Postagem Pública</h1>
            <Row>
              <Col md="6">
                <Input name="title" type="text" placeholder="Título" ref={register} required={true} />
                <textarea name="text" rows={6} className="w-100 rounded border border-dark" ref={register} required={true} />
              </Col>

              <Col md="6">
                <select className="w-100 rounded border border-dark" onChange={onChange}>
                  {tags.map(tag => (
                    <option key={tag.id} value={tag.name} id={tag.id}>
                      {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                    </option>
                  ))}
                </select>
                <hr/>
                <ListGroup>
                  {selectTags.map(id => (
                    <ListGroup.Item className="p-2 bg-dark text-danger mt-1" key={id} onClick={(event) => onClick(event, id)}>
                      {"#" + tags.find(tag => tag.id === id).name}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
            <Button variant="dark" className="w-50" type="submit">
              Publicar
            </Button>
          </Form>
        </Container>
      <Footer />
    </main>
  )
}

export async function getStaticProps() {
  const response = await api.get('/tags')
  const data = response.data

  return {
    props: {
      tags: data.tags
    }
  }
}