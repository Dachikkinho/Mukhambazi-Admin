'use client';

import { useForm } from 'react-hook-form';
import styles from './page.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { ErrorMessage } from '@/app/components/ErrorMessage/ErrorMessage';
import { Select } from '@/app/components/Select/Select';
import { Done } from '@/app/components/Done/Done';

interface CreateAuthor {
    firstName: string;
    lastName: string;
    biography: string;
    image: string;
    country: string;
}

export default function AddArtist() {
    useEffect(() => {
        document.title = 'Chakrulos | addArtist';
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateAuthor>();

    const [uploaded, setUploaded] = useState(false);
    const [uploadedName, setUploadedName] = useState('');
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();
    const param = useSearchParams();
    const id = param.get('id');

    useEffect(() => {
        if (id) {
            fetchAuthorData(id);
        }
    }, [id]);

    const fetchAuthorData = async (id: string) => {
        try {
            const response = await axios.get(
                `http://localhost:3001/authors/${id}`,
            );
            reset(response.data);
        } catch (error) {
            handleServerError(error);
        }
    };

    const handleServerError = (error: any) => {
        setServerError('An error occurred while processing your request.');
    };

    const onSubmit = async (author: CreateAuthor) => {
        author.country = 'GE';

        try {
            if (id) {
                await updateAuthor(id, author);
            } else {
                await createAuthor(author);
            }
            setUploaded(true);
            setUploadedName(`${author.firstName} ${author.lastName}`);
            reset();
        } catch (error) {
            handleServerError(error);
        }
    };

    const createAuthor = async (author: CreateAuthor) => {
        await axios.post('http://localhost:3001/authors/', author);
    };

    const updateAuthor = async (id: string, author: CreateAuthor) => {
        await axios.patch(`http://localhost:3001/authors/${id}`, author);
    };

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };

    return (
        <div className={styles.mainWrapper}>
            <Select onChange={onChange}>
                <option selected value="/addArtist">
                    Add New Artist
                </option>
                <option value="/addAlbum">Album</option>
                <option value="/addMusic">Musics</option>
            </Select>

            <div className={styles.container}>
                {uploaded ? (
                    <div className={styles.uploadedCont}>
                        <Done />
                        <h6 className={styles.success}>
                            Artist {id ? 'Updated' : 'Uploaded'}
                        </h6>
                        <p className={styles.name}>
                            {uploadedName}{' '}
                            {id ? 'Updated Successfully!' : 'Added on Platform'}
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.form}
                    >
                        <div className={styles.row}>
                            <label htmlFor="img">Artist Image</label>
                            <input
                                type="text"
                                id="img"
                                className={styles.input}
                                placeholder="Image Url"
                                {...register('image', {
                                    required: {
                                        value: true,
                                        message: 'Image is Required!',
                                    },
                                    pattern: {
                                        value: /\.(jpeg|jpg|gif|png|webp|bmp|svg|tiff|ico)$/i,
                                        message:
                                            'Please Enter Valid Image Url!',
                                    },
                                })}
                            />
                            {errors.image?.message && (
                                <ErrorMessage message={errors.image.message} />
                            )}
                        </div>
                        <div className={styles.row}>
                            <label htmlFor="firstname">Firstname</label>
                            <input
                                type="text"
                                id="firstname"
                                className={styles.input}
                                placeholder="Exp: Barry"
                                {...register('firstName', {
                                    required: {
                                        value: true,
                                        message: 'Firstname is Required!',
                                    },
                                })}
                            />
                            {errors.firstName?.message && (
                                <ErrorMessage
                                    message={errors.firstName.message}
                                />
                            )}
                        </div>
                        <div className={styles.row}>
                            <label htmlFor="lastname">Lastname</label>
                            <input
                                type="text"
                                id="lastname"
                                className={styles.input}
                                placeholder="Exp: White"
                                {...register('lastName', {
                                    required: {
                                        value: true,
                                        message: 'Lastname is Required!',
                                    },
                                })}
                            />
                            {errors.lastName?.message && (
                                <ErrorMessage
                                    message={errors.lastName.message}
                                />
                            )}
                        </div>
                        <div className={styles.row}>
                            <label htmlFor="bio">Artist Bio</label>
                            <input
                                placeholder="About Artist..."
                                id="bio"
                                className={styles.textarea}
                                {...register('biography', {
                                    required: {
                                        value: true,
                                        message: 'Biography is Required!',
                                    },
                                    maxLength: {
                                        value: 100,
                                        message:
                                            'Biography should not exceed 100 characters!',
                                    },
                                })}
                            />
                            {errors.biography?.message && (
                                <ErrorMessage
                                    message={errors.biography.message}
                                />
                            )}
                        </div>
                        <div>
                            <button type="submit" className={styles.confirm}>
                                Add Artist
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
