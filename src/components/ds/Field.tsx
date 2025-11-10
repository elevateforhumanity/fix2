import { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, forwardRef } from 'react';

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const baseInputStyles = 'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-0 disabled:bg-slate-100 disabled:cursor-not-allowed';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, required, className = '', ...props }, ref) => {
    const id = props.id || props.name || `field-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <label className={`text-sm block ${className}`}>
        <span className="font-medium text-slate-900">
          {label}
          {required && <span className="text-red-600 ml-1" aria-label="required">*</span>}
        </span>
        <input
          ref={ref}
          id={id}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${baseInputStyles} ${error ? 'border-red-500' : ''}`}
          {...props}
        />
        {error && (
          <span id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
            {error}
          </span>
        )}
      </label>
    );
  }
);

InputField.displayName = 'InputField';

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, required, className = '', ...props }, ref) => {
    const id = props.id || props.name || `field-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <label className={`text-sm block ${className}`}>
        <span className="font-medium text-slate-900">
          {label}
          {required && <span className="text-red-600 ml-1" aria-label="required">*</span>}
        </span>
        <textarea
          ref={ref}
          id={id}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${baseInputStyles} ${error ? 'border-red-500' : ''}`}
          {...props}
        />
        {error && (
          <span id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
            {error}
          </span>
        )}
      </label>
    );
  }
);

TextareaField.displayName = 'TextareaField';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement>, FieldProps {}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, required, className = '', children, ...props }, ref) => {
    const id = props.id || props.name || `field-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <label className={`text-sm block ${className}`}>
        <span className="font-medium text-slate-900">
          {label}
          {required && <span className="text-red-600 ml-1" aria-label="required">*</span>}
        </span>
        <select
          ref={ref}
          id={id}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${baseInputStyles} ${error ? 'border-red-500' : ''}`}
          {...props}
        >
          {children}
        </select>
        {error && (
          <span id={`${id}-error`} className="mt-1 text-xs text-red-600" role="alert">
            {error}
          </span>
        )}
      </label>
    );
  }
);

SelectField.displayName = 'SelectField';
