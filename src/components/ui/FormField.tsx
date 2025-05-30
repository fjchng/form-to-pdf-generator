import React from 'react';
import { Label } from './Label';
import { Input, InputProps } from './Input';

interface FormFieldProps extends InputProps {
  label: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  id,
  error,
  ...props
}) => {
  return (
    <div className="space-y-2 mb-4">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input id={id} error={error} {...props} />
    </div>
  );
};