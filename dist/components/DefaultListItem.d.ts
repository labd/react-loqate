import { LiHTMLAttributes } from 'react';
import { Item } from '..';
declare const DefaultListItem: (props: LiHTMLAttributes<HTMLLIElement> & {
    suggestion: Item;
}) => JSX.Element;
export default DefaultListItem;
