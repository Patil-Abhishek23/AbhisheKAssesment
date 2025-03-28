"use client";
import React from "react";
import { Dropdown } from "@carbon/react";

interface DropdownProps {
  id: string;
  invalidText?: string;
  items: string[];
  label: string;
  titleText?: string;
  onChange?: (option: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({
  id,
  items,
  label,
  titleText,
  onChange,
}) => {
  return (
    <Dropdown
      id={id}
      titleText={titleText}
      label={label}
      items={items}
      onChange={({ selectedItem }) => onChange && selectedItem && onChange(selectedItem)}
    />
  );
};

export default DropdownComponent;
