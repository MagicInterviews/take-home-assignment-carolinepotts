"use client";

import { Form } from "./Form";
import * as React from "react";
import { cn } from "../lib";
import { Search } from "lucide-react";

export type SearchTextFieldProps = React.ComponentProps<typeof Form.Root> & {
  name: string;
  controlProps?: React.ComponentProps<typeof Form.Control>;
};

export function SearchTextField({
  name,
  controlProps = {
    placeholder: 'Search',
    type: 'search',
  },
  ...props
}: SearchTextFieldProps) {
  return (
    <Form.Root {...props}>
      <Form.Field className="relative" name={name}>
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
        <Form.Control
          className={cn("border border-black rounded-md py-3 pr-3 pl-11")}
          {...controlProps}
        />
      </Form.Field>
    </Form.Root>
  );
}