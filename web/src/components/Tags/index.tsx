import { useMemo } from "react";

interface Props {
  data: string[]
}

const Tags: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.map(tag => (
        <label className="text-white" key={tag}>
          {'#' + tag}
          &nbsp;
        </label>
      ))}
    </>
  )
}

export default Tags;