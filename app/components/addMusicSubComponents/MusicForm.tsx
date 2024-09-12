'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreateMusic } from '@/app/interfaces/createMusic.interface';
import { MusicFormFields } from './MusicFormFields';
import { MusicFormStatus } from './MusicFormStatus';
import styles from '../../(authorised)/addMusic/page.module.scss';
import { Album } from '@/app/interfaces/album.interface';
import { Artists } from '@/app/interfaces/createArtist.interface';
import DeletePopUp from '../DeletePopUp/DeletePopUp';

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
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem('user');
        if (id) {
            axios
                .get(`https://mukhambazi-back.onrender.com/music/${id}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                .then((res) => {
                    reset(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    useEffect(() => {
        const jwt = localStorage.getItem('user');
        axios
            .get('https://mukhambazi-back.onrender.com/album/', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res) => {
                setAlbums(res.data);
            });

        axios
            .get('https://mukhambazi-back.onrender.com/authors/', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            .then((res) => {
                setArtists(res.data);
            });
    }, []);

    const onSubmit = async (music: CreateMusic) => {
        const jwt = localStorage.getItem('user');
        try {
            if (id) {
                await axios.patch(
                    `https://mukhambazi-back.onrender.com/music/${id}`,
                    {
                        name: music.name,
                        albumId: music.albumId,
                        authorId: music.authorId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    },
                );
            } else {
                await axios.post(
                    `https://mukhambazi-back.onrender.com/music/`,
                    {
                        name: music.name,
                        albumId: music.albumId,
                        authorId: music.authorId,
                        file: music.file[0],
                        image: music.image[0],
                        userId: 1,
                    },
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${jwt}`,
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
        <MusicFormStatus id={0} uploadedName={uploadedName} />
    ) : (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <MusicFormFields
                    register={register}
                    errors={errors}
                    albums={albums}
                    artists={artists}
                    files={!!!id}
                />
                <div className={styles.buttons}>
                    <button type="submit" className={styles.confirm}>
                        Add Music
                    </button>
                    {!!id && (
                        <button
                            type="button"
                            className={styles.delete}
                            onClick={() => setDeleteConfirm(true)}
                        >
                            Delete Music
                        </button>
                    )}
                </div>
            </form>
            <DeletePopUp
                closeFunc={() => {
                    setDeleteConfirm(false);
                }}
                confirm={() => {
                    setDeleteConfirm(false);
                    setUploaded(true);
                }}
                name="music"
                section="musics"
                open={deleteConfirm}
                deleteString={`https://mukhambazi-back.onrender.com/music/${id}`}
            />
        </>
    );
}
