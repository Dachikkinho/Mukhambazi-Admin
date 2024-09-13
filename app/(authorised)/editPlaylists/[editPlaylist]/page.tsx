'use client';

import Listdisabled from '@/app/components/Playlists/ListDisabled';
import { Playlist } from '@/app/interfaces/playlist.interface';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { PlaylistSelect } from '@/app/components/editPlaylistSubComponents/PlaylistSelect';

interface User {
    id: number;
    email: string;
    blocked: boolean;
    createdAt: string;
}

const EditPlaylist = () => {
    const params = useParams();
    const id = params.editPlaylist;
    const [playlists, setPlaylits] = useState<Playlist[]>([]);
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const accessToken = localStorage.getItem('user');
        axios
            .get(`https://mukhambazi-back.onrender.com/playlist/user`, {
                params: {
                    id: id,
                },

                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setPlaylits([...res.data]);
            });

        axios
            .get(`https://mukhambazi-back.onrender.com/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setUser(res.data);
            });
    }, []);

    const router = useRouter();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.push(e.target.value);
    };
    return (
        <div className={styles.mainWrapper}>
            <PlaylistSelect />
            <div className={styles.cont}>
                <div className={styles.heading}>
                    <img
                        src="/icons/user-solid.svg"
                        alt=""
                        className={styles.image}
                    />
                    <p>{user?.email}'s Playlists</p>
                </div>
                <div className={styles.playlist}>
                    {playlists.length ? (
                        playlists.map((playlist, i) => (
                            <Link
                                href={`/playlist/${playlist.id}`}
                                className={styles.wrap}
                                key={i}
                            >
                                <Listdisabled
                                    title={playlist.title}
                                    date={playlist.description}
                                    icon="green"
                                    playbtn="play"
                                />
                            </Link>
                        ))
                    ) : (
                        <p className={styles.noPlaylist}>
                            This User Has No Playlists Yet!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPlaylist;
