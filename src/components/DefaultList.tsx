import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { forwardRef, OlHTMLAttributes, Ref } from 'react';

const useStyles = makeStyles({
  list: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.08)',
    listStyleType: 'none',
    paddingInlineStart: 0,
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
});

const DefaultList = forwardRef(
  (
    props: OlHTMLAttributes<HTMLUListElement>,
    ref: Ref<HTMLUListElement>
  ): JSX.Element => {
    const { className, ...rest } = props;
    const classes = useStyles();

    return (
      <ul
        className={clsx(classes.list, className)}
        data-testid="default-list"
        {...rest}
        ref={ref}
      />
    );
  }
);

export default DefaultList;
