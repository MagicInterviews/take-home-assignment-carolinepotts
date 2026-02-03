"use client";

import { Form } from "./Form";
import * as React from "react";
import { cn } from "../lib";

export type TextFieldProps = React.ComponentProps<typeof Form.Field> & {
  name: string;
  controlProps?: React.ComponentProps<typeof Form.Control>;
};

export function TextField({
  name,
  controlProps = {},
  ...props
}: TextFieldProps) {
  return (
    <Form.Field name={name} {...props}>
      <Form.Control
        className={cn("border border-black rounded-md p-3")}
        {...controlProps}
      />
    </Form.Field>
  );
}