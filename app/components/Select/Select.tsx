import styles from './Select.module.scss';
import { ReactNode, ChangeEventHandler } from 'react';

type Props = {
    children: ReactNode;
    className?: string;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
};

export function Select({ children, className, onChange }: Props) {
    return (
        <select
            name=""
            id=""
            className={`${styles.select} ${className}`}
            onChange={onChange}
        >
            {children}
        </select>
    );
}
