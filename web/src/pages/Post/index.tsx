import React, { useState, useEffect, useCallback } from "react";
import { Container, Spinner } from "react-bootstrap";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import Tags from "../../components/Tags";

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

  const loadPostData = useCallback(async () => {
    const response = await api.get(`/post/show/${id}`)
    setPost(response.data.post as PostData);
    setLoged(true);
  }, [id]);

  useEffect(() => {
    loadPostData();
  }, [loadPostData]);

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
            <Tags value={post.tags} />
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