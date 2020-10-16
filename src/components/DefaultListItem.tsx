import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { LiHTMLAttributes } from 'react';

const useStyles = makeStyles({
  listItem: {
    cursor: 'pointer',
    marginTop: 4,
    marginBottom: 4,
  },
});

const DefaultListItem = (
  props: LiHTMLAttributes<HTMLLIElement>
): JSX.Element => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return <li className={clsx(classes.listItem, className)} {...rest} />;
};

export default DefaultListItem;
