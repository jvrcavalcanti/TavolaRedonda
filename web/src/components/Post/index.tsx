import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./style.scss";
import Tags from "../Tags";

interface IPost {
  id: Number;
  title: string;
  content: string;
  tags: string;
};

interface Props {
  data: IPost
};

const Post: React.FC<Props> = ({ data }) => {

  return (
    <ListGroupItem className="mt-2 bg-danger text-center">
      <Link className="link" to={"/post/" + data.id}>
        <h1>
          {data.title}
        </h1>

        <hr/>

        <p>
          {data.content}
        </p>
      </Link>

      <hr/>

      <p>
        <Tags value={data.tags} />
      </p>
    </ListGroupItem>
  );
};

export default Post;