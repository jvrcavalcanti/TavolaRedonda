import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  label: string;
  type: string;
  name: string;
};

const Input: React.FC<Props> = ({label, type, name}) => {
  return (
    <Form.Group className="bg-dark text-white rounded">
      <Form.Label className="p-1">
        {label}
      </Form.Label>
      <Form.Control type={type} name={name} placeholder={label} required />
    </Form.Group>
  );
};

export default Input;