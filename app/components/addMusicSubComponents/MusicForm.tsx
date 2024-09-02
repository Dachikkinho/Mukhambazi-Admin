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
                .get(`https://mukhambazi-back.onrender.com/music/${id}`)
                .then((res) => {
                    reset(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    useEffect(() => {
        axios.get('https://mukhambazi-back.onrender.com/album/').then((res) => {
            setAlbums(res.data);
        });

        axios
            .get('https://mukhambazi-back.onrender.com/authors/')
            .then((res) => {
                setArtists(res.data);
            });
    }, []);

    const onSubmit = async (music: CreateMusic) => {
        try {
            if (id) {
                await axios.patch(
                    `https://mukhambazi-back.onrender.com/music/${id}`,
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
                    `https://mukhambazi-back.onrender.com/music/`,
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
        <MusicFormStatus id={0} uploadedName={uploadedName}   />
    ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <MusicFormFields
                register={register}
                errors={errors}
                albums={albums}
                artists={artists}
            />
            <button type="submit" className={styles.confirm}>
                Add Music
            </button>
        </form>
    );
}
