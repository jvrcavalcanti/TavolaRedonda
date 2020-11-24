import React, { useContext, useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { AuthContext } from "../../contexts/auth"
import Input from "../Input"

interface FormInputs {
  username: string
  password: string
}


const SignIn = () => {
  const { register, handleSubmit } = useForm<FormInputs>()
  const { signIn } = useContext(AuthContext)
  const [message, setMessage] = useState("")

  function onSubmit(data: FormInputs) {
    try {
      signIn({
        username: data.username,
        password: data.password
      })
    } catch (e) {
      setMessage("Erro no login")
    }
  }

  return (
    <Form className="w-50 m-auto p-3 bg-danger rounded" onSubmit={handleSubmit(onSubmit)}>
      {message && (
        <Alert variant="danger">
          {message}
        </Alert>
      )}
      <h1 className="text-center">Login</h1>
      <Input id="username" name="username" type="text" placeholder="Nome de Usuário" required={true} ref={register} />
      <Input id="password" name="password" type="password" placeholder="Senha" required={true} ref={register} />
      <div className="text-center">
        <Button variant="secondary" type="submit">
          Logar
        </Button>
      </div>
    </Form>
  )
}

export default SignIn