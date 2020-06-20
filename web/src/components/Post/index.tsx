import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./style.scss";

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
  function replaceTag(tag: string) {
    return tag.replace("#", "!")
  }
  
  function tagsToString(tags: string) {
    return JSON.parse(tags)
               .map((tag: string) => (
              <Link to={"/search?tag=" + replaceTag(tag)} className="tag-link">
                &nbsp;{tag}
              </Link>
              )
            )
  }

  return (
    <ListGroupItem className="mt-2 bg-danger">
      <h1 className="text-center">
        {data.title}
      </h1>

      <hr/>

      <p>
        {data.content}
      </p>

      <hr/>

      <p className="text-center">
        {tagsToString(data.tags)}
      </p>
    </ListGroupItem>
  );
};

export default Post;