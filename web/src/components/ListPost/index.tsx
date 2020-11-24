import React from 'react'
import { ListGroup } from 'react-bootstrap'
import Post from '../Post'
import style from './style.module.css'

interface IPost {
  id: number
  title: string
  text: string
  tags: string[]
}

interface Props {
  posts: IPost[]
}

const ListPost: React.FC<Props> = ({ posts }) => {
  return (
    <ListGroup>
      {posts.map(post => (
        <ListGroup.Item key={post.id} className={style.item}>
          <Post data={post} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default ListPost