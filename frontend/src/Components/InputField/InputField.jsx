import { forwardRef } from 'react';

import './InputField.css';

const noop = () => {};

const InputField = forwardRef(function InputField(props, ref) {
  const {
    value,
    onChange,
    onBlur = noop,
    onFocus = noop,
    error = null,
    className = '',
    type = 'text',
    placeholder = '',
    textarea,
  } = props;

  if (textarea) {
    return (
      <div className={`input-field-wrapper ${className}`}>
        <textarea
          className={`input-field ${error ? 'error' : ''}`}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          ref={ref}
        />
        {
          error && (
            <div className="input-field-alert">
              <i className="fa-solid fa-triangle-exclamation alert-icon" />
              <span>{error}</span>
            </div>
          )
        }
      </div>
    );
  }

  return (
    <div className={`input-field-wrapper ${className}`}>
      <input
        type={type}
        className={`input-field ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        ref={ref}
      />
      {
        error && (
          <div className="input-field-alert">
            <i className="fa-solid fa-triangle-exclamation alert-icon" />
            <span>{error}</span>
          </div>
        )
      }
    </div>
  );
});

export default InputField;
