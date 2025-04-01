"use client";
import React from "react";
import { Button, TextInput } from "@carbon/react";

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isButtonVisible?: boolean;
}

const Input: React.FC<InputProps> = ({ id, label, value, onChange, placeholder, isButtonVisible }) => {
  return (
    <><TextInput id={id} labelText={label} value={value} onChange={onChange} placeholder={placeholder} />{isButtonVisible && <Button>Button</Button>}</>
  );
};

export default Input;
