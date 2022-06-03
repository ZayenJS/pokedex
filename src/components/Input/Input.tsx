import { ChangeEvent, FC } from 'react';
import { GenericObject } from '../../../@types';
import { State } from '../../../store/reducers';
import { useInput } from '../../hooks/useInput';

import styles from './Input.module.scss';

interface InputProps {
  id?: string;
  className?: {
    container?: string;
    input?: string;
    label?: string;
  };
  data?: {
    container?: GenericObject<string>;
    input?: GenericObject<string>;
    label?: GenericObject<string>;
  };
  type?: string;
  name: string;
  reducer: keyof State;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  label?: string;
}

const Input: FC<InputProps> = ({
  id,
  className,
  type = 'text',
  name,
  reducer,
  value,
  onChange,
  placeholder,
  errorMessage = '',
  label,
  data,
}) => {
  const { _value, _onChange } = useInput(name, reducer);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) return onChange(event);

    _onChange((event.target as HTMLInputElement).value);
  };

  let input = (
    <>
      <input
        className={className?.input}
        name={name}
        type={type}
        id={id}
        autoComplete="off"
        placeholder={placeholder}
        value={value ?? _value}
        onChange={onChangeHandler}
        {...data?.input}
      />
      {label ? (
        <label className={className?.label} htmlFor={id} {...data?.label}>
          {label}
        </label>
      ) : null}
      {errorMessage ? <span>{errorMessage}</span> : null}
    </>
  );

  if (type === 'checkbox') {
    input = (
      <>
        <input
          name={name}
          checked={value as unknown as boolean}
          value={value}
          type="checkbox"
          id={id}
          className={className?.input}
          onChange={onChangeHandler}
          {...data?.input}
        />
        {label ? (
          <label htmlFor={id} className={className?.label} {...data?.label}>
            {label}
          </label>
        ) : null}
      </>
    );
  }

  return (
    <div className={`${styles.base} ${className?.container ?? ''}`} {...data?.container}>
      {input}
    </div>
  );
};

export default Input;
