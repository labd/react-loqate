import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { InputHTMLAttributes } from 'react';

const useStyles = makeStyles({
  input: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid black',
    height: 40,
  },
});

const DefaultInput = (
  props: InputHTMLAttributes<HTMLInputElement>
): JSX.Element => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return <input className={clsx(classes.input, className)} {...rest} />;
};

export default DefaultInput;
