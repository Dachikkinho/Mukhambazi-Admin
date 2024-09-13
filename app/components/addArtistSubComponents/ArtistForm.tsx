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
import { UpdateAuthor } from '@/app/interfaces/updateAuthor.interface';
import DeletePopUp from '../DeletePopUp/DeletePopUp';

const ArtistForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<CreateAuthor>();

    const [uploaded, setUploaded] = useState(false);
    const [uploadedName, setUploadedName] = useState('');
    const [, setServerError] = useState<string | null>(null);
    const param = useSearchParams();
    const id = param.get('id');
    const [edit, setEdit] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    let watchImag;

    useEffect(() => {
        if (id) {
            fetchAuthorData(id);
            setEdit(true);
            watchImag = watch('image');
        } else {
            setEdit(false);
        }
    }, [id]);

    const fetchAuthorData = async (id: string) => {
        const jwt = localStorage.getItem('user');
        try {
            const response = await axios.get(
                `https://mukhambazi-back.onrender.com/authors/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                },
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
        const jwt = localStorage.getItem('user');
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
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );
    };

    const updateAuthor = async (id: string, author: UpdateAuthor) => {
        const jwt = localStorage.getItem('user');
        await axios
            .patch(
                `https://mukhambazi-back.onrender.com/authors/${id}`,
                author,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                },
            )
            .then((res) => {
                console.log(author);
            });
    };

    return uploaded ? (
        <FormStatus
            id={id || ''}
            uploadedName={uploadedName}
            deleting={deleteConfirm}
        />
    ) : (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {!edit && (
                    <ArtistImageInput
                        register={register}
                        errors={errors}
                        required={!edit}
                    />
                )}
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
                    register={register('lastName', {})}
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
                            message:
                                'Biography should not exceed 500 characters!',
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
                <div className={styles.buttons}>
                    <button type="submit" className={styles.confirm}>
                        Upload Artist
                    </button>
                    {edit && (
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
                name={'artist'}
                section="artists"
                open={deleteConfirm}
                closeFunc={() => setDeleteConfirm(false)}
                deleteString={`https://mukhambazi-back.onrender.com/authors/${id}`}
                confirm={() => {
                    setUploaded(true);
                    setDeleteConfirm(false);
                }}
            />
        </>
    );
};

export default ArtistForm;
