'use client';

import styles from './SidebarSelected.module.scss';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const SidebarSelected = () => {
    const path = usePathname();
    const [position, setPosition] = useState('179px');

    useEffect(() => {
        switch (path) {
            case '/':
                setPosition('179px');
                break;
            case path.startsWith('/artists') ? path : '':
                setPosition('228px');
                break;
            case path.startsWith('/albums') ? path : '':
                setPosition('275px');
                break;
            case '/songs':
                setPosition('448px');
                break;
            case path.startsWith('/playlist') ? path : '':
                setPosition('402px');
                break;
            case '/favorites':
                setPosition('496px');
                break;
            case '/addArtist':
                setPosition('623px');
                break;
            case '/addAlbum':
                setPosition('623px');
                break;
            case '/addMusic':
                setPosition('623px');
                break;
            case path.startsWith('/editPlaylists') ? path : '':
                setPosition('623px');
                break;
            case path.startsWith('/UserManagement') ? path : '':
                setPosition('623px');
                break;
            default:
                setPosition('179px');
        }
    }, [path]);

    return <div className={styles.main} style={{ top: position }}></div>;
};

export default SidebarSelected;
