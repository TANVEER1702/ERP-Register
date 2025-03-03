import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";

interface InputProps {
  name: string; // Name of the input
  label: string; // Label for the input
  type?:
    | "text"
    | "number"
    | "checkbox"
    | "radio"
    | "email"
    | "select"
    | "tel"
    | "password"
    | "password"; // Input type (e.g., text, email, password)
  value?: string | number | string[] | boolean; // Current value of the input
  placeholder?: string; // Placeholder text
  required?: boolean; // Whether the input is required
  minLength?: number; // Minimum length for the input
  maxLength?: number; // Maximum length for the input
  pattern?: string; // Regex pattern for validation
  errorMessage?: string; // Custom error message
  className?: string; // Custom CSS classes
  disabled?: boolean; // Disable the input
  readOnly?: boolean; // Read only the input
  defaultValue?: string; // Default value for the input
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void; // Change event handler
  validate?: (value: string | number | string[] | boolean) => string | null; // Validation function (returns error or null)
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Blur event handler
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // KeyUp event handler
  onFocus?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Focus event handler
}

export const InputField: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  onKeyUp,
  onFocus,
  placeholder = "",
  required = false,
  readOnly = false,
  minLength,
  maxLength,
  pattern,
  errorMessage = "",
  defaultValue = "",
  className = "",
  disabled = false,
}) => {
  const [error, setError] = useState<string | null>(null);
  const validateInput = (inputValue: string): string | null => {
    if (required && !inputValue) {
      return "This field is required.";
    }
    if (minLength && inputValue.length < minLength) {
      return `Minimum length is ${minLength} characters.`;
    }
    if (maxLength && inputValue.length > maxLength) {
      return `Maximum length is ${maxLength} characters.`;
    }
    if (pattern && !new RegExp(pattern).test(inputValue)) {
      return errorMessage;
    }
    return null;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const validationError = validateInput(inputValue);
    setError(validationError); // Update error state immediately
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    const validationError = validateInput(inputValue);
    setError(validationError); // Update error state on keyup
  };
  const handleOnFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value;
    const validationError = validateInput(inputValue);
    setError(validationError); // Update error state on keyup
  };
  // Determine whether to use controlled or uncontrolled
  const inputProps = {
    name,
    type,
    placeholder,
    required,
    readOnly,
    disabled,
    className: `border rounded-md px-4 py-2 focus:outline-none ${
      error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    } ${className}`,
    onBlur: handleBlur,
    onKeyUp: handleKeyUp,
    onFocus: handleOnFocus,
  };

  if (value !== undefined) {
    // Controlled input (using `value` and `onChange`)
    return (
      <div className={`flex flex-col w-full`}>
        <label className="mb-1 mt-2 text-sm font-medium text-gray-700">
          {label}
        </label>
        {/* {type === 'number' && <div className="w-full max-w-full">
          <PhoneInput
               country={"in"}
               value={value}
               onChange={(phone) => onChange?.({ target: { name, value: phone } } as any)}
               containerStyle={{ width: "100%" }}
               inputStyle={{
                 width: "100%",
                 height: "40px",
                 borderRadius: "6px",
               }}
               buttonClass="w-12 h-10 flex items-center justify-center border rounded"
             />
             </div>
                
              } */}
        <input
          {...inputProps}
          // @ts-expect-error: Type issue with external library
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          // @ts-expect-error: Type issue with external library
          onFocus={onFocus}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  } else {
    // Uncontrolled input (using `defaultValue`)
    return (
      <div className={`flex flex-col`}>
        <label className="mb-1 mt-2 text-sm font-medium text-gray-700">
          {label}
        </label>
        {/* @ts-expect-error: Type issue with external library */}
        <input {...inputProps} defaultValue={defaultValue} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
};
