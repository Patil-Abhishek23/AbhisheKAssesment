"use client";
import React from "react";
import { Button } from "@carbon/react";

interface ButtonProps {
  id: string;
  label: string;
}

const CustomButton: React.FC<ButtonProps> = ({ id, label }) => {
  return <Button id={id}>{label}</Button>;
};

export default CustomButton;
