import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { CreateMusic } from '@/app/interfaces/createMusic.interface';
import styles from '../../(authorised)/addMusic/page.module.scss';
import MusicSelect from '../MusicSelect/MusicSelect';
import { Album } from '@/app/interfaces/album.interface';
import { Artists } from '@/app/interfaces/createArtist.interface';

type Props = {
    register: UseFormRegister<CreateMusic>;
    errors: FieldErrors<CreateMusic>;
    albums: Album[];
    artists: Artists[];
    files: boolean;
};

export const MusicFormFields = ({
    register,
    errors,
    albums,
    artists,
    files,
}: Props) => (
    <>
        <div className={styles.row}>
            <label htmlFor="name" className={styles.label}>
                Music Name
            </label>
            <input
                id="name"
                type="text"
                className={styles.input}
                placeholder="Music Name..."
                {...register('name', {
                    required: {
                        value: true,
                        message: 'Music Name Is Required!',
                    },
                })}
            />
            {errors.name?.message && (
                <ErrorMessage message={errors.name.message} />
            )}
        </div>

        {files && (
            <>
                <div className={styles.row}>
                    <label htmlFor="file" className={styles.label}>
                        Music File
                    </label>
                    <input
                        type="file"
                        id="file"
                        className={styles.input}
                        placeholder="Music File"
                        {...register('file', {
                            required: {
                                value: true,
                                message: 'MP3 is Required!',
                            },
                        })}
                    />
                    {errors.file?.message && (
                        <ErrorMessage message={errors.file.message} />
                    )}
                </div>
                <div className={styles.row}>
                    <label htmlFor="image" className={styles.label}>
                        Music Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        className={styles.input}
                        placeholder="Image"
                        {...register('image', {
                            required: {
                                value: true,
                                message: 'Image is Required!',
                            },
                            validate: {
                                fileType: (file: FileList) =>
                                    ['png', 'jpg', 'jpeg'].includes(
                                        file[0].type
                                            .split('/')[1]
                                            .toLowerCase(),
                                    ) || 'The file type should be Image',
                            },
                        })}
                    />
                    {errors.image?.message && (
                        <ErrorMessage message={errors.image.message} />
                    )}
                </div>{' '}
            </>
        )}

        <div className={styles.row}>
            <label htmlFor="albumId" className={styles.label}>
                Select Album
            </label>
            <MusicSelect
                register={register}
                value="albumId"
                message="Album is required!"
            >
                {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                        {album.name}
                    </option>
                ))}
            </MusicSelect>
            {errors.albumId?.message && (
                <ErrorMessage message={errors.albumId.message} />
            )}
        </div>

        <div className={styles.row}>
            <label htmlFor="authorId" className={styles.label}>
                Select Artist ID
            </label>
            <MusicSelect
                register={register}
                value="authorId"
                message="Author is required!"
            >
                {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                       {artist.id} | {artist.firstName} {artist.lastName}
                    </option>
                ))}
            </MusicSelect>
            {errors.authorId?.message && (
                <ErrorMessage message={errors.authorId.message} />
            )}
        </div>
    </>
);
