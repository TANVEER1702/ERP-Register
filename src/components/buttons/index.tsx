import React from 'react';

interface ButtonProps {
  label: string; // Text to display on the button
  onClick?: () => void; // Function to execute on button click
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'; // Button style variants
  size?: 'small' | 'medium' | 'large'; // Button size
  disabled?: boolean; // Disable button
  loading?: boolean; // Show loading spinner
  className?: string; // Custom additional CSS classes
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
}) => {
  // Tailwind CSS for variants
  const variantStyles: { [key: string]: string } = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    outline: 'bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  // Tailwind CSS for sizes
  const sizeStyles: { [key: string]: string } = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`rounded font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          Loading...
        </span>
      ) : (
        label
      )}
    </button>
  );
};


/*
How to use add the button props reference code here...

<Button label="Submit" onClick={() => alert('Button clicked!')} />
<Button label="Primary" variant="primary" />
<Button label="Secondary" variant="secondary" />
<Button label="Outline" variant="outline" />
<Button label="Danger" variant="danger" />
<Button label="Small" size="small" />
<Button label="Medium" size="medium" />
<Button label="Large" size="large" />
<Button label="Disabled" disabled />
<Button label="Loading" loading />
<Button 
  label="Custom Button" 
  className="bg-purple-500 hover:bg-purple-600 text-white" 
/>
*/