import clsx from 'clsx';
import React, { LiHTMLAttributes } from 'react';
import { Item } from '..';
import './DefaultListItem.css';

const DefaultListItem = (
  props: LiHTMLAttributes<HTMLLIElement> & { suggestion: Item }
): JSX.Element => {
  const { className, value, suggestion, onKeyDown, ...rest } = props;

  const regex = new RegExp(
    `(.*)(${value?.toString().replace(/\W/g, '')})(.*)`,
    'i'
  );

  const search = `${suggestion.Text} ${suggestion.Description}`;

  const result = search.match(regex);
  const [before, match, after] = result?.slice(1) ?? ['', '', ''];

  return (
    <li
      className={clsx('react-loqate-list-item', className)}
      aria-label={before + match + after}
      onKeyDown={(e) => {
        onKeyDown?.(e);

        if (e.key === 'ArrowDown') {
          // don't scroll the page
          e.preventDefault();
          const listItem = e.target as HTMLLIElement;
          const next = listItem.nextSibling as HTMLLIElement;
          if (next) {
            next.focus();
          }
        }
        if (e.key === 'ArrowUp') {
          // don't scroll the page
          e.preventDefault();
          const listItem = e.target as HTMLLIElement;
          const previous = listItem.previousSibling as HTMLLIElement;
          if (previous) {
            previous.focus();
          }
        }
      }}
      {...rest}
    >
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
