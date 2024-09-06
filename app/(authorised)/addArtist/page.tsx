'use client';

import styles from './page.module.scss';
import { useEffect } from 'react';
import { ArtistSelect } from '@/app/components/addArtistSubComponents/ArtistSelect';
import { useRouter } from 'next/navigation';
import ArtistForm from '@/app/components/addArtistSubComponents/ArtistForm';
import PrivateRoute from '@/app/components/PrivateRoute/PrivateRoute';

export default function AddArtist() {
    const router = useRouter();

    useEffect(() => {
        document.title = 'Chakrulos | AddArtist';
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };

    return (
        <PrivateRoute>
            <div className={styles.mainWrapper}>
                <ArtistSelect onChange={onChange} />
                <div className={styles.container}>
                    <ArtistForm />
                </div>
            </div>
        </PrivateRoute>
    );
}
