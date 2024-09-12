import { useEffect, useState } from 'react';
import styles from '../../(authorised)/editPlaylists/page.module.scss';
import UserCard from './UserCard/UserCard';
import axios from 'axios';

interface User {
    id: number;
    email: string;
    blocked: boolean;
    createdAt: string;
}

const PlaylistUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get('https://mukhambazi-back.onrender.com/users').then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <div className={styles.userCont}>
            {users.map((user) => (
                <UserCard
                    email={user.email}
                    blocked={user.blocked}
                    active={user.createdAt}
                    id={user.id}
                />
            ))}
        </div>
    );
};

export default PlaylistUsers;
