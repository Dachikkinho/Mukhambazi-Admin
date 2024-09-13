import Link from 'next/link';
import styles from './UserCard.module.scss';

type Props = {
    email: string;
    blocked: boolean;
    active: string;
    id: number;
};

const UserCard = ({ email, blocked, active, id }: Props) => {
    const date = new Date(active);

    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;

    return (
        <Link href={`/editPlaylists/${id}`} className={styles.card}>
            <div>
                <img
                    src="/icons/user-solid.svg"
                    alt=""
                    className={styles.image}
                    draggable={false}
                />
            </div>
            <div className={styles.bottom}>
                <p className={styles.email}>{email}</p>
                {blocked ? (
                    <p className={styles.blocked}>Blocked</p>
                ) : (
                    <p className={styles.active}>Active</p>
                )}
                <p>Active Since: {formattedDate}</p>
            </div>
        </Link>
    );
};

export default UserCard;
