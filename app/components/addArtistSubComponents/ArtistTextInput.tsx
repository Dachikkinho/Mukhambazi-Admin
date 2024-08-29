import { CreateAuthor } from '@/app/interfaces/createAuthor.interface';
import { FieldErrors, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import styles from '../../(authorised)/addArtist/page.module.scss';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';

type Props = {
    label: string,
    id: string,
    placeholder: string,
    className?: string,
    register:  UseFormRegisterReturn<string>,
    errorMessage: string | undefined
}

export const ArtistTextInput = ({
    label,
    id,
    placeholder,
    className = styles.input,
    register,
    errorMessage,
}: Props) => (
    <div className={styles.row}>
        <label htmlFor={id}>{label}</label>
        <input
            type="text"
            id={id}
            className={className}
            placeholder={placeholder}
            {...register}
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
);
