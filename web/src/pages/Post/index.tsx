import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { tagsToString } from "../../services/tag";

interface PostData {
  id: Number;
  title: string;
  content: string;
  tags: string;
  likes: Number;
  dislikes: Number;
};

const Post: React.FC = () => {
  const { id } = useParams();
  const [loged, setLoged] = useState(false);
  const [post, setPost] = useState({} as PostData);

  async function loadPostData() {
    const response = await api.get(`/post/show/${id}`)
    setPost(response.data.post as PostData);
    setLoged(true);
  }

  useEffect(() => {
    loadPostData();
  }, [id]);

  console.log(post)

  return (
    <Container className="border border-dark rounded bg-danger p-3 text-center">
      {loged ? (
        <div>
          <h1>
            {post.title}
          </h1>
          <hr/>
          <p>
            {post.content}
          </p>
          <hr/>
          <p>
            {tagsToString(post.tags)}
          </p>
        </div>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
};

export default Post;