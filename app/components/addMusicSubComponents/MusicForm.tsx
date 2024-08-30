'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreateMusic } from '@/app/interfaces/createMusic.interface';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { Done } from '@/app/components/Done/Done';
import styles from '../../(authorised)/addMusic/page.module.scss';
import AdminSelect from '../MusicSelect/MusicSelect';
import { Album } from '@/app/interfaces/album.interface';
import { Artists } from '@/app/interfaces/createArtist.interface';
import MusicSelect from '../MusicSelect/MusicSelect';

export default function MusicForm() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateMusic>();
    const [uploaded, setUploaded] = useState(false);
    const [uploadedName, setUploadedName] = useState('');
    const param = useSearchParams();
    const id = param.get('id');
    const [albums, setAlbums] = useState<Album[]>([]);
    const [artists, setArtists] = useState<Artists[]>([]);

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:3001/music/${id}`)
                .then((res) => {
                    reset(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    useEffect(() => {
        axios.get('http://localhost:3001/album/').then((res) => {
            setAlbums(res.data);
        });

        axios.get('http://localhost:3001/authors/').then((res) => {
            setArtists(res.data);
        });
    }, []);

    const onSubmit = async (music: CreateMusic) => {
        try {
            if (id) {
                await axios.patch(
                    `http://localhost:3001/music/${id}`,
                    {
                        name: music.name,
                        albumId: music.albumId,
                        authorId: music.authorId,
                        file: music.file[0],
                        image: music.image[0],
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
            } else {
                await axios.post(
                    `http://localhost:3001/music/`,
                    {
                        name: music.name,
                        albumId: music.albumId,
                        authorId: music.authorId,
                        file: music.file[0],
                        image: music.image[0],
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
            }
            setUploaded(true);
            setUploadedName(music.name);
            reset();
        } catch (err) {
            console.log(err);
        }
    };

    return uploaded ? (
        <div className={styles.uploadedCont}>
            <Done />
            <h6 className={styles.success}>
                Music {id ? 'Updated' : 'Uploaded'}
            </h6>
            <p className={styles.name}>
                {uploadedName} {id ? 'Updated' : 'Added'} in Music
            </p>
        </div>
    ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

            <div className={styles.row}>
                <label htmlFor="url" className={styles.label}>
                    Music File
                </label>
                <input
                    type="file"
                    id="img"
                    className={styles.input}
                    placeholder="Image"
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
                <label htmlFor="id" className={styles.label}>
                    Musig Image
                </label>
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
                                    file[0].type.split('/')[1].toLowerCase(),
                                ) || 'The file type should be Image',
                        },
                    })}
                />
                {errors.authorId?.message && (
                    <ErrorMessage message={errors.authorId.message} />
                )}
            </div>

            <div className={styles.row}>
                <label htmlFor="id" className={styles.label}>
                    Select Album
                </label>
                <AdminSelect
                    register={register}
                    value="albumId"
                    message="Album is required!"
                >
                    {albums.map((album) => (
                        <option value={album.id}> {album.name}</option>
                    ))}
                </AdminSelect>
                {errors.authorId?.message && (
                    <ErrorMessage message={errors.authorId.message} />
                )}
            </div>

            <div className={styles.row}>
                <label htmlFor="id" className={styles.label}>
                    Select Artist
                </label>
                <MusicSelect
                    register={register}
                    value="authorId"
                    message="Author is required!"
                >
                    {artists.map((artist) => (
                        <option value={artist.id}>
                            {' '}
                            {artist.firstName} {artist.lastName}
                        </option>
                    ))}
                </MusicSelect>
                {errors.authorId?.message && (
                    <ErrorMessage message={errors.authorId.message} />
                )}
            </div>

            <button type="submit" className={styles.confirm}>
                Add Music
            </button>
        </form>
    );
}
