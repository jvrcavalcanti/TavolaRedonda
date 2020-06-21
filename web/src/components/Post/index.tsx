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
              <Link key={tag} to={"/search?tag=" + replaceTag(tag)} className="tag-link">
                &nbsp;{tag}
              </Link>
              )
            )
  }

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
        {tagsToString(data.tags)}
      </p>
    </ListGroupItem>
  );
};

export default Post;