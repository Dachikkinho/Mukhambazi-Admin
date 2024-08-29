'use client';

import { useForm } from 'react-hook-form';
import styles from './page.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArtistForm } from '@/app/components/addArtistSubComponents/ArtistForm';
import { ArtistSelect } from '@/app/components/addArtistSubComponents/ArtistSelect';
import { FormStatus } from '@/app/components/addArtistSubComponents/FormStatus';
import { CreateAuthor } from '@/app/interfaces/createAuthor.interface';

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
            <ArtistSelect onChange={onChange} />

            <div className={styles.container}>
                {uploaded ? (
                    <FormStatus id={id} uploadedName={uploadedName} />
                ) : (
                    <ArtistForm
                        onSubmit={handleSubmit(onSubmit)}
                        register={register}
                        errors={errors}
                    />
                )}
            </div>
        </div>
    );
}
