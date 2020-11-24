import React from 'react'
import Tags from '../Tags'

interface Post {
  id: number
  title: string
  text: string
  tags: string[]
}

interface Props {
  data: Post
}

const Post: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-danger border border-dark rounded p-3">
      <h3 className="text-center">{data.title}</h3>
      <hr/>
      <p>{data.text}</p>
      <div className="text-center">
        <Tags data={data.tags} />
      </div>
    </div>
  )
}

export default Post