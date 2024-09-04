import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FormStatus } from '@/app/components/addArtistSubComponents/FormStatus';
import { CreateAuthor } from '@/app/interfaces/createAuthor.interface';
import { ArtistImageInput } from './ArtistImageInput';
import { ArtistTextInput } from './ArtistTextInput';
import styles from '../../(authorised)/addArtist/page.module.scss';
import SelectArtist from '../SelectArtist/SelectArtist';

const ArtistForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateAuthor>();

    const [uploaded, setUploaded] = useState(false);
    const [uploadedName, setUploadedName] = useState('');
    const [, setServerError] = useState<string | null>(null);
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
                `https://mukhambazi-back.onrender.com/authors/${id}`,
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
            'https://mukhambazi-back.onrender.com/authors/',
            {
                image: author.image[0],
                firstName: author.firstName,
                lastName: author.lastName,
                biography: author.biography,
                country: author.Region,
                Category: author.Category,
                Region: author.Region,
                userId: 1,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    };

    const updateAuthor = async (id: string, author: CreateAuthor) => {
        await axios.patch(
            `https://mukhambazi-back.onrender.com/authors/${id}`,
            author,
        );
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
            <div className={styles.row}>
                <label htmlFor="category" className={styles.selectLabel}>
                    Select Category
                </label>
                <SelectArtist
                    id="category"
                    register={register}
                    value="Category"
                    message="Category Is Required!"
                >
                    <option value="Artists" selected>
                        Top Artists
                    </option>

                    <option value="Charts">Top Charts</option>
                    <option value="Hits">Top Hits</option>
                </SelectArtist>
            </div>
            <div className={styles.row}>
                <label htmlFor="category" className={styles.selectLabel}>
                    Select Region
                </label>
                <SelectArtist
                    id="category"
                    register={register}
                    value="Region"
                    message="Region Is Required!"
                >
                    <option value="Popular" selected>
                        Popular
                    </option>

                    <option value="Georgian">Georgian</option>
                    <option value="European">European</option>
                </SelectArtist>
            </div>
            <button type="submit" className={styles.confirm}>
                Add Artist
            </button>
        </form>
    );
};

export default ArtistForm;
