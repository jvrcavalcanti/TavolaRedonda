import React from "react";
import { Link } from "react-router-dom";

interface Props {
  value: string;
};

const Tags: React.FC<Props> = ({ value }) => {
  function replaceTag (tag: string) {
    return tag.replace("#", "!")
  }

  return (
    <>
      {JSON.parse(value).map((tag: string) => (
          <Link key={tag} to={"/search?tag=" + replaceTag(tag)} className="tag-link">
            &nbsp;{tag}
          </Link>
        )
      )}
    </>
  );
}

export default React.memo(Tags);