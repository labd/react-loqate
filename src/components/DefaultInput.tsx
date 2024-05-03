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
        data-testid="default-input"
        ref={ref}
        {...rest}
      />
    );
  }
);

export default DefaultInput;
