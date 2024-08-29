import styles from '../../(authorised)/addArtist/page.module.scss';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';

export const ArtistTextInput = ({
    label,
    id,
    placeholder,
    className = styles.input,
    register,
    errorMessage,
}) => (
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
