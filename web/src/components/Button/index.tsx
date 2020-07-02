import React from "react"

import "./style.scss";

interface Props {
  type?: "button" | "submit" | "reset" | undefined
  children: React.ReactNode
  className?: string
}

const Button: React.FC<Props> = ({children, type, className}) => {
  return (
    <button
      type={type}
      className={"nav-link border text-center text-danger rounded bg-dark btn-app" + " " + className}
    >
      {children}
    </button>
  )
};

export default Button;