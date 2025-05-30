import React from 'react';
import { Label } from './Label';
import { Input, InputProps } from './Input';

interface FormFieldProps extends InputProps {
  label: string;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, required, id, error, ...props }, ref) => {
    return (
      <div className="space-y-2 mb-4">
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        <Input id={id} error={error} ref={ref} {...props} />
      </div>
    );
  }
);

FormField.displayName = 'FormField';