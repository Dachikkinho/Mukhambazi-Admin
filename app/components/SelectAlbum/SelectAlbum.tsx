import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './SelectAlbum.module.scss';
import { CreateAlbum } from '@/app/interfaces/createAlbum.interface';

type Props = {
    children: ReactNode;
    register: UseFormRegister<CreateAlbum>;
    message: string;
    id: string;
};

const SelectAlbum = ({ children, register, message, id }: Props) => {
    return (
        <select
            className={styles.select}
            id={id}
            {...register('authorId', {
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

export default SelectAlbum;
