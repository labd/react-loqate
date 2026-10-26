import clsx from 'clsx';
import React, { forwardRef, type OlHTMLAttributes, type Ref } from 'react';
import './DefaultList.css';

const DefaultList = forwardRef(
  (
    props: OlHTMLAttributes<HTMLUListElement>,
    ref: Ref<HTMLUListElement>
  ): React.JSX.Element => {
    const { className, ...rest } = props;

    return (
      <ul
        className={clsx('react-loqate-default-list', className)}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default DefaultList;
