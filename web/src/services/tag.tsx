import React from "react";
import { Link } from "react-router-dom";

const replaceTag = (tag: string) => {
  return tag.replace("#", "!")
}

const tagsToString = (tags: string) => {
  return JSON.parse(tags)
             .map((tag: string) => (
            <Link key={tag} to={"/search?tag=" + replaceTag(tag)} className="tag-link">
              &nbsp;{tag}
            </Link>
            )
          )
}

export {
  replaceTag,
  tagsToString
};