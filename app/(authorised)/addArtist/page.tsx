'use client';

import styles from './page.module.scss';
import { useEffect } from 'react';
import { ArtistSelect } from '@/app/components/addArtistSubComponents/ArtistSelect';
import { useRouter } from 'next/navigation';
import ArtistForm from '@/app/components/addArtistSubComponents/ArtistForm';

export default function AddArtist() {
    const router = useRouter();

    useEffect(() => {
        document.title = 'Chakrulos | AddArtist';
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
