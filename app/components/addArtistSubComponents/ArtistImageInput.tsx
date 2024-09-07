import { CreateAuthor } from '@/app/interfaces/createAuthor.interface';
import styles from '../../(authorised)/addArtist/page.module.scss';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
    register: UseFormRegister<CreateAuthor>;
    errors: FieldErrors<CreateAuthor>;
    required: boolean;
};

export const ArtistImageInput = ({ register, errors, required }: Props) => (
    <div className={styles.row}>
        <label htmlFor="img">Artist Image</label>
        <input
            type="file"
            id="img"
            className={styles.input}
            placeholder="Image"
            {...register('image', {
                required: { value: required, message: 'Image is Required!' },
                validate: {
                    fileType: (file: FileList) =>
                        ['png', 'jpg', 'jpeg'].includes(
                            file[0].type.split('/')[1].toLowerCase(),
                        ) || 'The file type should be Image',
                },
            })}
        />
        {errors.image?.message && (
            <ErrorMessage message={errors.image.message} />
        )}
    </div>
);
