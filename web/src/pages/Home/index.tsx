import React, { useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import api from "../../services/api";
import Post from "../../components/Post";

interface IPost {
  id: Number;
  title: string;
  content: string;
  tags: string;
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const response = await api.get("/post/list?order=desc&limit=5");
    const data = response.data.data;
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      <div className="text-center bg-danger p-3 rounded border border-dark">
        <h1>Postagens Recentes</h1>
      </div>

      <ListGroup>
        {posts.map((post: IPost) => (
          <Post key={"post-" + post.id} data={post} />
        ))}
      </ListGroup>
    </Container>
  );
};

export default Home;