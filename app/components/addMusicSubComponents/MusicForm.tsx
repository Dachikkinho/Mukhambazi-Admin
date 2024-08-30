'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreateMusic } from '@/app/interfaces/createMusic.interface';
import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { Done } from '@/app/components/Done/Done';
import styles from '../../(authorised)/addMusic/page.module.scss';

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

    const onSubmit = async (music: CreateMusic) => {
        try {
            if (id) {
                await axios.patch(`http://localhost:3001/music/${id}`, music);
            } else {
                await axios.post(`http://localhost:3001/music/`, music);
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
                    Music URL
                </label>
                <input
                    id="url"
                    type="text"
                    className={styles.input}
                    placeholder="Music File..."
                    {...register('url', {
                        required: {
                            value: true,
                            message: 'Music URL Is Required!',
                        },
                        pattern: {
                            value: /\.(mp3)$/i,
                            message: 'Please Upload Valid MP3 File!',
                        },
                    })}
                />
                {errors.url?.message && (
                    <ErrorMessage message={errors.url.message} />
                )}
            </div>

            <div className={styles.row}>
                <label htmlFor="id" className={styles.label}>
                    Artist ID
                </label>
                <input
                    id="id"
                    type="number"
                    className={styles.input}
                    placeholder="Artist ID..."
                    {...register('authorId', {
                        required: {
                            value: true,
                            message: 'Author ID is Required!',
                        },
                        valueAsNumber: true,
                    })}
                />
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
