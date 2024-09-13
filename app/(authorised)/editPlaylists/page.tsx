'use client';

import styles from './page.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AlbumForm from '@/app/components/addAlbumSubComponents/AlbumForm';
import PrivateRoute from '@/app/components/PrivateRoute/PrivateRoute';
import { PlaylistSelect } from '@/app/components/editPlaylistSubComponents/PlaylistSelect';
import PlaylistUsers from '@/app/components/editPlaylistSubComponents/PlaylistUsers';

export default function AddArtist() {
    const router = useRouter();

    useEffect(() => {
        document.title = 'Chakrulos | AddAlbum';
    }, []);

    return (
        <PrivateRoute>
            <div className={styles.mainWrapper}>
                <PlaylistSelect />
                <div className={styles.container}>
                    <PlaylistUsers />
                </div>
            </div>
        </PrivateRoute>
    );
}
