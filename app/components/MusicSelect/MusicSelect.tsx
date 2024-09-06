import { UseFormRegister } from 'react-hook-form';
import styles from './MusicSelect.module.scss';
import { ReactNode } from 'react';
import { CreateMusic } from '@/app/interfaces/createMusic.interface';

type Props = {
    children: ReactNode;
    register: UseFormRegister<CreateMusic>;
    value: 'albumId' | 'authorId';
    message: string;
};

const MusicSelect = ({ children, register, value, message }: Props) => {
    return (
        <select
            id=""
            className={styles.select}
            {...register(value, {
                required: {
                    value: true,
                    message: message,
                },
                valueAsNumber: true,
            })}
        >
            {children}
        </select>
    );
};

export default MusicSelect;
