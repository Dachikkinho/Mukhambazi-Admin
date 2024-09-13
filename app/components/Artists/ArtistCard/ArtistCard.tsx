import Link from 'next/link';
import styles from './ArtistCard.module.scss';

type Props = {
    bgColor: string;
    name: string;
    plays: number;
    pfp: string;
    id: number;
};

const ArtistCard = ({ bgColor, name, plays, pfp, id }: Props) => {
    return (
        <div className={styles.wrap}>
            <Link href={`/addArtist?id=${id}`} className={styles.editButton}>
                <img src="/icons/edit.svg" alt="edit" width={20} height={20} />
            </Link>
            <div
                className={styles.card}
                style={{
                    backgroundColor: bgColor,
                }}
            >
                <div className={styles.container}>
                    <img
                        src={pfp}
                        alt=""
                        className={styles.pfp}
                        draggable={false}
                    />
                    <p className={styles.name}>{name}</p>
                    <p className={styles.plays}>{plays} Plays</p>
                </div>
            </div>
        </div>
    );
};
export default ArtistCard;
