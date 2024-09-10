'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import PrivateRoute from '@/app/components/PrivateRoute/PrivateRoute';
import Usersmenu from '@/app/components/Users/Users';
import { UserSelect } from '@/app/components/Users/UserSelect';

export default function UserMenu() {
    const router = useRouter();

    useEffect(() => {
        document.title = 'Chakrulos | usersMenu';
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };

    return (
        <PrivateRoute>
            <div className={styles.mainWrapper}>
                <div className={styles.select}>
                    <UserSelect onChange={onChange} />
                </div>
                <div className={styles.container}>
                    <Usersmenu />
                </div>
            </div>
        </PrivateRoute>
    );
}
