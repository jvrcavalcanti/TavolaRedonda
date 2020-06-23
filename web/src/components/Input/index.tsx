import React, { useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useField } from "@unform/core";

interface Props {
  name: string;
  label?: string;
  helper?: string
};

type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({name, label, helper, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: inputRef.current
    })
  }, [fieldName, registerField]);

  return (
    <Form.Group className="bg-dark text-white rounded">
      {label && (
        <label className="p-1" htmlFor={fieldName}>
          {label}
        </label>
      )}

      <input
        {...rest}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        name={name}
        placeholder={label}
        required
        className="form-control"
      />

      {helper && <small
                  id="emailHelp"
                  className="form-text text-muted p-1"
                >
                  {helper}
                </small>
      }

      { error && <span>{error}</span> }
    </Form.Group>
  );
};

export default Input;