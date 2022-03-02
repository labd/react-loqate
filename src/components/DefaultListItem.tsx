import clsx from 'clsx';
import React, { LiHTMLAttributes } from 'react';
import { Item } from '..';
import './DefaultListItem.css';

const DefaultListItem = (
  props: LiHTMLAttributes<HTMLLIElement> & { suggestion: Item }
): JSX.Element => {
  const { className, value, children, suggestion, ...rest } = props;

  const regex = new RegExp(
    `(.*)(${value?.toString().replace(/\W/g, '')})(.*)`,
    'i'
  );

  const search = `${suggestion.Text} ${suggestion.Description}`;

  const result = search.match(regex);
  const [before, match, after] = result?.slice(1) ?? ['', '', ''];

  return (
    <li className={clsx('react-loqate-list-item', className)} {...rest}>
      {result?.length === 4 ? (
        <>
          {before}
          <strong>{match}</strong>
          {after}
        </>
      ) : (
        search
      )}
    </li>
  );
};

export default DefaultListItem;
