'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormStatus } from '@/app/components/addAlbumSubComponents/FormStatus';
import { CreateAlbum } from '@/app/interfaces/createAlbum.interface';
import styles from '../../(authorised)/addAlbum/page.module.scss';
import { AlbumFormFields } from './AlbumFormFields';

const AlbumForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateAlbum>();
    const [uploaded, setUploaded] = useState(false);
    const [uploadedName, setUploadedName] = useState('');
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();
    const param = useSearchParams();
    const id = param.get('id');

    useEffect(() => {
        if (id) {
            fetchAlbumData(id);
        }
    }, [id]);

    const fetchAlbumData = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:3001/albums/${id}`);
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
        await axios.post('http://localhost:3001/albums/', album);
    };

    const updateAlbum = async (id: string, album: CreateAlbum) => {
        await axios.patch(`http://localhost:3001/albums/${id}`, album);
    };

    return uploaded ? (
        <FormStatus id={id || ''} uploadedName={uploadedName} />
    ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <AlbumFormFields register={register} errors={errors} />
            <button type="submit" className={styles.confirm}>
                Add Album
            </button>
        </form>
    );
};

export default AlbumForm;
