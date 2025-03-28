"use client";
import React from "react";
import { TextInput } from "@carbon/react";

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ id, label, value, onChange, placeholder }) => {
  return (
    <TextInput id={id} labelText={label} value={value} onChange={onChange} placeholder={placeholder} />
  );
};

export default Input;
