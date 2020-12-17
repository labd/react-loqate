import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { LiHTMLAttributes } from 'react';
import { Item } from '..';

const useStyles = makeStyles({
  listItem: {
    cursor: 'pointer',
    marginTop: 4,
    marginBottom: 4,
  },
});

const DefaultListItem = (
  props: LiHTMLAttributes<HTMLLIElement> & { suggestion: Item }
): JSX.Element => {
  const { className, value, children, suggestion, ...rest } = props;
  const classes = useStyles();

  const regex = new RegExp(`(.*)(${value as string})(.*)`, 'i');

  const search = `${suggestion.Text} ${suggestion.Description}`;

  const result = search.match(regex);
  const [before, match, after] = result?.slice(1) ?? ['', '', ''];

  return (
    <li className={clsx(classes.listItem, className)} {...rest}>
      <>
        {before}
        <strong>{match}</strong>
        {after}
      </>
    </li>
  );
};

export default DefaultListItem;
