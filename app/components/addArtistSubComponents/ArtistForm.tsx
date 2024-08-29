import { ArtistImageInput } from './ArtistImageInput';
import { ArtistTextInput } from './ArtistTextInput';
import styles from '../../(authorised)/addArtist/page.module.scss';

export const ArtistForm = ({ onSubmit, register, errors }) => (
    <form onSubmit={onSubmit} className={styles.form}>
        <ArtistImageInput register={register} errors={errors} />
        <ArtistTextInput
            label="Firstname"
            id="firstname"
            placeholder="Exp: Barry"
            register={register('firstName', {
                required: { value: true, message: 'Firstname is Required!' },
            })}
            errorMessage={errors.firstName?.message}
        />
        <ArtistTextInput
            label="Lastname"
            id="lastname"
            placeholder="Exp: White"
            register={register('lastName', {
                required: { value: true, message: 'Lastname is Required!' },
            })}
            errorMessage={errors.lastName?.message}
        />
        <ArtistTextInput
            label="Artist Bio"
            id="bio"
            placeholder="About Artist..."
            className={styles.textarea}
            register={register('biography', {
                required: { value: true, message: 'Biography is Required!' },
                maxLength: {
                    value: 500,
                    message: 'Biography should not exceed 500 characters!',
                },
            })}
            errorMessage={errors.biography?.message}
        />
        <button type="submit" className={styles.confirm}>
            Add Artist
        </button>
    </form>
);
