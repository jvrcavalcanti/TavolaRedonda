import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ListPost from '../components/ListPost'
import api from '../services/api'

interface IPost {
  id: number
  title: string
  text: string
  tags: string[]
}

interface Props {
  posts: IPost[]
}

export default function Home({ posts }: Props) {
  return (
    <main>
      <Head>
        <title>Távola Redonda - Home</title>
      </Head>
      <Header />
      <div className="container">
        <div className="bg-danger border border-dark text-center rounded">
          <h1>Postagens Recentes</h1>
        </div>

        <ListPost posts={posts} />
      </div>
      <Footer />
    </main>
  )
}

export async function getStaticProps() {
  const response = await api.get('/posts')
  const data = response.data

  return {
    props: {
      posts: data.data
    }
  }
}