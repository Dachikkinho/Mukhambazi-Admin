import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styles from '../../(authorised)/addAlbum/page.module.scss';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { CreateAlbum } from '@/app/interfaces/createAlbum.interface';
import SelectAlbum from '../SelectAlbum/SelectAlbum';
import { useEffect, useState } from 'react';
import { Artists } from '@/app/interfaces/createArtist.interface';
import axios from 'axios';

type Props = {
    register: UseFormRegister<CreateAlbum>;
    errors: FieldErrors<CreateAlbum>;
    update: boolean;
};

export const AlbumFormFields = ({ register, errors, update }: Props) => {
    const [artists, setArtists] = useState<Artists[]>([]);

    useEffect(() => {
        axios
            .get('https://mukhambazi-back.onrender.com/authors')
            .then((res) => {
                setArtists(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            {update && (
                <div className={styles.row}>
                    <label htmlFor="img">Artist Image</label>
                    <input
                        type="file"
                        id="img"
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
                </div>
            )}
            <div className={styles.row}>
                <label htmlFor="name" className={styles.label}>
                    Album Name
                </label>
                <input
                    id="name"
                    type="text"
                    className={styles.input}
                    placeholder="Album Name"
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Album Name Is Required!',
                        },
                    })}
                />
                {errors.name?.message && (
                    <ErrorMessage message={errors.name.message} />
                )}
            </div>
            <div className={styles.row}>
                <label htmlFor="artistName" className={styles.label}>
                    Artist Name
                </label>
                <input
                    id="artistName"
                    type="text"
                    className={styles.input}
                    placeholder="Artist Name"
                    {...register('artistName', {
                        required: {
                            value: true,
                            message: 'Artist Name Is Required!',
                        },
                    })}
                />
                {errors.artistName?.message && (
                    <ErrorMessage message={errors.artistName.message} />
                )}
            </div>

            <div className={styles.row}>
                <label htmlFor="releaseDate" className={styles.label}>
                    Release Date
                </label>
                <input
                    type="text"
                    id="releaseDate"
                    className={styles.input}
                    placeholder="Release Date"
                    {...register('releaseDate', {
                        required: {
                            value: true,
                            message: 'Release Date Is Required!',
                        },
                    })}
                />
                {errors.releaseDate?.message && (
                    <ErrorMessage message={errors.releaseDate.message} />
                )}
            </div>

            <div className={styles.row}>
                <label htmlFor="authorId" className={styles.label}>
                    Author ID
                </label>
                <SelectAlbum
                    register={register}
                    id="authorid"
                    message="Author is Required!"
                >
                    <option selected></option>

                    {artists.map((artist) => (
                        <option value={artist.id}>
                            {artist.id} | {artist.firstName} {artist.lastName} 
                        </option>
                    ))}
                </SelectAlbum>

                {errors.authorId?.message && (
                    <ErrorMessage message={errors.authorId.message} />
                )}
            </div>
        </>
    );
};
