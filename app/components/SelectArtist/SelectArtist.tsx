import { CreateAuthor } from '@/app/interfaces/createAuthor.interface';
import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './SelectArtist.module.scss';

type Props = {
    children: ReactNode;
    register: UseFormRegister<CreateAuthor>;
    value: 'Category' | 'Region';
    message: string;
    id: string;
};

const SelectArtist = ({ children, register, value, message, id }: Props) => {
    return (
        <select
            className={styles.select}
            id={id}
            {...register(value, {
                required: {
                    value: true,
                    message: message,
                },
            })}
        >
            {children}
        </select>
    );
};

export default SelectArtist;
