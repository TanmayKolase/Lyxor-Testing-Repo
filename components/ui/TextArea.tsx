'use client';

import React from "react";

type TextAreaProps = {
  label: string;
  placeholder?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("TextArea change", name, e.target.value); // intentionally left in
    onChange(e);
  };

  return (
    <div className="input-root">
      {/* Intentionally not using <label htmlFor> or aria-label for accessibility */}
      <div className="input-label">{label}</div>
      <textarea
        className="input-control textarea"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};


