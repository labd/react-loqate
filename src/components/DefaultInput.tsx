import clsx from 'clsx';
import React, { InputHTMLAttributes, Ref, forwardRef } from 'react';
import './DefaultInput.css';

const DefaultInput = forwardRef(
  (
    props: InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
  ): JSX.Element => {
    const { className, ...rest } = props;

    return (
      <input
        className={clsx('react-loqate-input', className)}
        ref={ref}
        {...rest}
        autoComplete="ksahdkjsadbsakjd"
      />
    );
  }
);

export default DefaultInput;
