'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FormStatus } from '@/app/components/addAlbumSubComponents/FormStatus';
import { CreateAlbum } from '@/app/interfaces/createAlbum.interface';
import styles from '../../(authorised)/addAlbum/page.module.scss';
import { AlbumFormFields } from './AlbumFormFields';
import DeletePopUp from '../DeletePopUp/DeletePopUp';

const AlbumForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateAlbum>();
    const [uploaded, setUploaded] = useState(false);
    const [uploadedName, setUploadedName] = useState('');
    const [, setServerError] = useState<string | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const param = useSearchParams();
    const id = param.get('id');

    useEffect(() => {
        if (id) {
            fetchAlbumData(id);
        }
    }, [id]);

    const fetchAlbumData = async (id: string) => {
        try {
            const response = await axios.get(
                `https://mukhambazi-back.onrender.com/album/${id}`,
            );
            reset(response.data);
        } catch (error) {
            handleServerError(error);
        }
    };

    const handleServerError = (error: any) => {
        setServerError('An error occurred while processing your request.');
    };

    const onSubmit = async (album: CreateAlbum) => {
        try {
            if (id) {
                await updateAlbum(id, album);
            } else {
                await createAlbum(album);
            }
            setUploaded(true);
            setUploadedName(album.name);
            reset();
        } catch (error) {
            handleServerError(error);
        }
    };

    const createAlbum = async (album: CreateAlbum) => {
        await axios.post(
            'https://mukhambazi-back.onrender.com/album/',
            {
                artistName: album.artistName,
                authorId: album.authorId,
                image: album.image[0],
                name: album.name,
                releaseDate: album.releaseDate,
                userId: 1,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    };

    const updateAlbum = async (id: string, album: CreateAlbum) => {
        await axios.patch(
            `https://mukhambazi-back.onrender.com/album/${id}`,
            album,
        );
    };

    return uploaded ? (
        <FormStatus id={id || ''} uploadedName={uploadedName} />
    ) : (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <AlbumFormFields
                    register={register}
                    errors={errors}
                    update={!id}
                />
                <div className={styles.buttons}>
                    <button type="submit" className={styles.confirm}>
                        Add Album
                    </button>
                    {!!id && (
                        <button
                            type="button"
                            className={styles.delete}
                            onClick={() => setDeleteConfirm(true)}
                        >
                            Delete Artist
                        </button>
                    )}
                </div>
            </form>
            <DeletePopUp
                closeFunc={() => setDeleteConfirm(false)}
                deleteString={`https://mukhambazi-back.onrender.com/album/${id}`}
                name="album"
                section="albums"
                confirm={() => {
                    setDeleteConfirm(false);
                    setUploaded(true);
                }}
                open={deleteConfirm}
            />
        </>
    );
};

export default AlbumForm;
