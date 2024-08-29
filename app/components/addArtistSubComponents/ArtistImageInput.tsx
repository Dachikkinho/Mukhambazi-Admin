import styles from '../../(authorised)/addArtist/page.module.scss';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';

export const ArtistImageInput = ({ register, errors }) => (
    <div className={styles.row}>
        <label htmlFor="img">Artist Image</label>
        <input
            type="text"
            id="img"
            className={styles.input}
            placeholder="Image Url"
            {...register('image', {
                required: { value: true, message: 'Image is Required!' },
                pattern: {
                    value: /\.(jpeg|jpg|gif|png|webp|bmp|svg|tiff|ico)$/i,
                    message: 'Please Enter Valid Image Url!',
                },
            })}
        />
        {errors.image?.message && (
            <ErrorMessage message={errors.image.message} />
        )}
    </div>
);
