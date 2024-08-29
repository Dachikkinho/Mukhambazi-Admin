'use client';

import { useForm } from 'react-hook-form';
import styles from './page.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArtistSelect } from '@/app/components/addArtistSubComponents/ArtistSelect';
import { FormStatus } from '@/app/components/addArtistSubComponents/FormStatus';
import { CreateAuthor } from '@/app/interfaces/createAuthor.interface';
import router from 'next/router';
import ArtistForm from '@/app/components/addArtistSubComponents/ArtistForm';

export default function AddArtist() {
    useEffect(() => {
        document.title = 'Chakrulos | addArtist';
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };
    return (
        <div className={styles.mainWrapper}>
            <ArtistSelect onChange={onChange} />

            <div className={styles.container}>
                <ArtistForm />
            </div>
        </div>
    );
}
