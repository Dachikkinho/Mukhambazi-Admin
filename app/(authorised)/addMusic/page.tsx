'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import MusicForm from '@/app/components/addMusicSubComponents/MusicForm';
import { MusicSelect } from '@/app/components/addMusicSubComponents/MusicSelect';

export default function AddMusic() {
    const router = useRouter();

    useEffect(() => {
        document.title = 'Chakrulos | AddMusic';
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };

    return (
        <div className={styles.mainWrapper}>
            <MusicSelect onChange={onChange} />
            <div className={styles.container}>
                <MusicForm />
            </div>
        </div>
    );
}
