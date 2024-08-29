import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from '../../(authorised)/addAlbum/page.module.scss';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { CreateAlbum } from '@/app/interfaces/createAlbum.interface';

type Props = {
    register: UseFormRegister<CreateAlbum>;
    errors: FieldErrors<CreateAlbum>;
};

export const AlbumFormFields = ({ register, errors }: Props) => (
    <>
        <div className={styles.row}>
            <label htmlFor="name" className={styles.label}>Album Name</label>
            <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="Album Name"
                {...register('name', {
                    required: { value: true, message: 'Album Name Is Required!' },
                })}
            />
            {errors.name?.message && <ErrorMessage message={errors.name.message} />}
        </div>

        <div className={styles.row}>
            <label htmlFor="artistName" className={styles.label}>Artist Name</label>
            <input
                id="artistName"
                type="text"
                className={styles.input}
                placeholder="Artist Name"
                {...register('artistName', {
                    required: { value: true, message: 'Artist Name Is Required!' },
                })}
            />
            {errors.artistName?.message && <ErrorMessage message={errors.artistName.message} />}
        </div>

        <div className={styles.row}>
            <label htmlFor="releaseDate" className={styles.label}>Release Date</label>
            <input
                type="text"
                id="releaseDate"
                className={styles.input}
                placeholder="Release Date"
                {...register('releaseDate', {
                    required: { value: true, message: 'Release Date Is Required!' },
                })}
            />
            {errors.releaseDate?.message && <ErrorMessage message={errors.releaseDate.message} />}
        </div>

        <div className={styles.row}>
            <label htmlFor="authorId" className={styles.label}>Author ID</label>
            <input
                type="number"
                id="authorId"
                className={styles.input}
                placeholder="Author ID"
                {...register('authorId', {
                    required: { value: true, message: 'Author ID Is Required!' },
                    valueAsNumber: true,
                })}
            />
            {errors.authorId?.message && <ErrorMessage message={errors.authorId.message} />}
        </div>
    </>
);
