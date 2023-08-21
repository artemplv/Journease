import { forwardRef } from 'react';

import './InputField.css';

const noop = () => {};

const InputField = forwardRef(function InputField(props, ref) {
  const {
    value,
    onChange = noop,
    onBlur = noop,
    onFocus = noop,
    onKeyDown = noop,
    error = null,
    className = '',
    type = 'text',
    placeholder = '',
    disabled,
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
          disabled={disabled}
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
        disabled={disabled}
        onKeyDown={onKeyDown}
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
