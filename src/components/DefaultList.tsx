import clsx from 'clsx';
import React, { forwardRef, OlHTMLAttributes, Ref } from 'react';
import './DefaultList.css';

const DefaultList = forwardRef(
  (
    props: OlHTMLAttributes<HTMLUListElement>,
    ref: Ref<HTMLUListElement>
  ): JSX.Element => {
    const { className, ...rest } = props;

    return (
      <ul
        className={clsx('react-loqate-default-list', className)}
        data-testid="default-list"
        {...rest}
        ref={ref}
      />
    );
  }
);

export default DefaultList;
