import './InputField.css';

const noop = () => {};

function InputField(props) {
  const {
    value,
    onChange,
    onBlur = noop,
    error = null,
    className = '',
    type = 'text',
    placeholder = '',
  } = props;

  return (
    <div className={`input-field-wrapper ${className}`}>
      <input
        type={type}
        className={`input-field ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
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

export default InputField;
