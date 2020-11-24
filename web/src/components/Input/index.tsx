import React, { Ref, RefObject } from 'react'
import { Form } from 'react-bootstrap'

interface Props {
  name: string
  type: string
  className?: string
  placeholder?: string
  label?: string
  tip?: string
  required?: boolean
  pattern?: string
  id?: string
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ label, tip, ...rest }, ref) => {
  return (
    <Form.Group className="bg-dark rounded p-1">
      {label !== undefined && (
        <Form.Label className="text-white">{label}</Form.Label>
      )}
      <Form.Control ref={ref} {...rest} />
      {tip !== undefined && (
        <Form.Text className="text-muted">
          {tip}
        </Form.Text>
      )}
    </Form.Group>
  )
})

export default Input