import React, { useState, useEffect } from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";
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
  const [loaded, setLoaded] = useState(false);

  async function getPosts() {
    const response = await api.get("/post/list?order=desc&limit=5");
    const data = response.data.data;
    setPosts(data);
    setLoaded(true);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container className="text-center">
      {!loaded ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div className="bg-danger p-3 rounded border border-dark">
            <h1>Postagens Recentes</h1>
          </div>

          <ListGroup>
            {posts.map((post: IPost) => (
              <Post key={"post-" + post.id} data={post} />
            ))}
          </ListGroup>
        </>
      )}
    </Container>
  );
};

export default Home;