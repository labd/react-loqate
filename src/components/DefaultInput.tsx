import clsx from 'clsx';
import React, { InputHTMLAttributes } from 'react';
import './DefaultInput.css';

const DefaultInput = (
  props: InputHTMLAttributes<HTMLInputElement>
): JSX.Element => {
  const { className, ...rest } = props;

  return (
    <input
      className={clsx('react-loqate-input', className)}
      data-testid="default-input"
      {...rest}
    />
  );
};

export default DefaultInput;
