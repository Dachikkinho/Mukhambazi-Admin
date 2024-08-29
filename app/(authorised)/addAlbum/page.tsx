'use client';

import styles from './page.module.scss';
import { useEffect } from 'react';
import { AlbumSelect } from '@/app/components/addAlbumSubComponents/AlbumSelect';
import { useRouter } from 'next/navigation';
import AlbumForm from '@/app/components/addAlbumSubComponents/AlbumForm';

export default function AddArtist() {
    const router = useRouter();

    useEffect(() => {
        document.title = 'Chakrulos | Add Artist';
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };

    return (
        <div className={styles.mainWrapper}>
            <AlbumSelect onChange={onChange} />
            <div className={styles.container}>
                <AlbumForm />
            </div>
        </div>
    );
}
