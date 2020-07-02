import React, { useState, useEffect, useCallback, useContext } from "react";
import { Container, Spinner, Button, Alert } from "react-bootstrap";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import Tags from "../../components/Tags";
import AuthContext from "../../contexts/auth";

import LikeBlack from "../../images/likepretu.png";
import LikeWhite from "../../images/likebranco.png";

import DisLikeBlack from "../../images/deslikepretu.png";
import DisLikeWhite from "../../images/deslikebranco.png";

import "./style.scss";

interface PostData {
  id: Number;
  title: string;
  content: string;
  tags: string;
  likes: Number;
  dislikes: Number;
};

const Post: React.FC = () => {
  const { token, signed } = useContext(AuthContext);
  const { id } = useParams();
  const [loged, setLoged] = useState(false);
  const [post, setPost] = useState({} as PostData);
  const [status, setStatus] = useState(2);

  const [message, setMessage] = useState("");

  const loadPostData = useCallback(async () => {
    const response = await api.get(`/post/show/${id}`)
    setPost(response.data.post as PostData);
    setLoged(true);
  }, [id]);

  
  const loadStatus = useCallback(async () => {
    if (!signed) {
      return
    }

    const response = await api.get(`/user/post/${id}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    const data = response.data;

    if (response.status === 200 || data !== "") {
      setStatus(data.status);
    }
  }, [id, token, signed]);

  const like = async () => {
    if (!signed) {
      setMessage("Aparetemente você precisa estar logado para dar Like")
      return
    }

    const response = await api.put(`/post/like/${id}`, {}, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    
    if (response.status === 200) {
      setStatus(status === 1 ? 2 : 1)
      setMessage("")
      return
    }

    setMessage("Error no servidor")
  }

  const dislike = async () => {
    if (!signed) {
      setMessage("Aparetemente você precisa estar logado para dar DisLike")
      return
    }

    const response = await api.put(`/post/dislike/${id}`, {}, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    
    if (response.status === 200) {
      setStatus(status === 0 ? 2 : 0)
      setMessage("")
      return
    }

    setMessage("Error no servidor")
  }

  useEffect(() => {
    loadPostData();
    loadStatus();
  }, [loadPostData, loadStatus]);

  const handleBtnLike = () => {
    return (
      <Button variant="success" className="w-100 border border-dark" onClick={like}>
        {status === 1 ? (
          <img className="img-fluid" src={LikeWhite} alt="Imagem Like Branco" />
        ) : (
          <img className="img-fluid" src={LikeBlack} alt="Imagem Like Preto" />
        )}     
      </Button>
    );
  };

  const handleBtnDisLike = () => {
    return (
      <Button variant="success" className="w-100 border border-dark" onClick={dislike}>
        {status === 0 ? (
          <img className="img-fluid" src={DisLikeWhite} alt="Imagem DisLike Branco"  />
        ) : (
          <img className="img-fluid" src={DisLikeBlack} alt="Imagem DisLike Preto" />
        )}     
      </Button>
    );
  };

  const handleMessage = () => {
    return (
      <Alert variant="danger">
        {message}
      </Alert>
    )
  }

  return (
    <Container className="border border-dark rounded bg-danger p-3 text-center">
      {message === "" ? "" : handleMessage() }
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
          <div className="d-flex">
            <div className="w-50">
              {handleBtnLike()}
            </div>
            <div className="w-50">
              {handleBtnDisLike()}
            </div>
          </div>
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