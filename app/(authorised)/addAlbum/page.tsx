'use client';

import styles from './page.module.scss';
import { useEffect } from 'react';
import { AlbumSelect } from '@/app/components/addAlbumSubComponents/AlbumSelect';
import { useRouter } from 'next/navigation';
import AlbumForm from '@/app/components/addAlbumSubComponents/AlbumForm';
import PrivateRoute from '@/app/components/PrivateRoute/PrivateRoute';

export default function AddArtist() {
    const router = useRouter();

    useEffect(() => {
        document.title = 'Chakrulos | AddAlbum';
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };

    return (
        <PrivateRoute>
            <div className={styles.mainWrapper}>
                <AlbumSelect onChange={onChange} />
                <div className={styles.container}>
                    <AlbumForm />
                </div>
            </div>
        </PrivateRoute>
    );
}
