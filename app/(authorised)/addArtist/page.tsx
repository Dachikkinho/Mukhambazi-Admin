'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { ArtistSelect } from '@/app/components/addArtistSubComponents/ArtistSelect';
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
