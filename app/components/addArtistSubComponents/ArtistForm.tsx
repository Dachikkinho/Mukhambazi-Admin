import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArtistSelect } from '@/app/components/addArtistSubComponents/ArtistSelect';
import { FormStatus } from '@/app/components/addArtistSubComponents/FormStatus';
import { CreateAuthor } from '@/app/interfaces/createAuthor.interface';
import { ArtistImageInput } from './ArtistImageInput';
import { ArtistTextInput } from './ArtistTextInput';
import styles from '../../(authorised)/addArtist/page.module.scss';

const ArtistForm = () => {
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
        console.log(author.image);

        await axios.post(
            'http://localhost:3001/authors/',
            {
                image: author.image[0],
                firstName: author.firstName,
                lastName: author.lastName,
                biography: author.biography,
                country: 'usa',
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    };

    const updateAuthor = async (id: string, author: CreateAuthor) => {
        await axios.patch(`http://localhost:3001/authors/${id}`, author);
    };

    return uploaded ? (
        <FormStatus id={id || ''} uploadedName={uploadedName} />
    ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <ArtistImageInput register={register} errors={errors} />
            <ArtistTextInput
                label="Firstname"
                id="firstname"
                placeholder="Exp: Barry"
                register={register('firstName', {
                    required: {
                        value: true,
                        message: 'Firstname is Required!',
                    },
                })}
                errorMessage={errors.firstName?.message}
            />
            <ArtistTextInput
                label="Lastname"
                id="lastname"
                placeholder="Exp: White"
                register={register('lastName', {
                    required: { value: true, message: 'Lastname is Required!' },
                })}
                errorMessage={errors.lastName?.message}
            />
            <ArtistTextInput
                label="Artist Bio"
                id="bio"
                placeholder="About Artist..."
                className={styles.textarea}
                register={register('biography', {
                    required: {
                        value: true,
                        message: 'Biography is Required!',
                    },
                    maxLength: {
                        value: 500,
                        message: 'Biography should not exceed 500 characters!',
                    },
                })}
                errorMessage={errors.biography?.message}
            />
            <button type="submit" className={styles.confirm}>
                Add Artist
            </button>
        </form>
    );
};

export default ArtistForm;
