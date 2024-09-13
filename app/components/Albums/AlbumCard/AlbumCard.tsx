import Link from 'next/link';
import styles from './AlbumCard.module.scss';

type Props = {
    name: string;
    lastName: string;
    plays: string;
    image: string;
    id: number;
};

const Albumcard = ({ name, lastName, plays, image, id }: Props) => {
    return (
        <div className={styles.wrap}>
            <Link href={`/addAlbum?id=${id}`} className={styles.editButton}>
                <img src="/icons/edit.svg" alt="edit" className={styles.edit} width={20} height={20} />
            </Link>
            <div className={styles.artists}>
                <div className={styles.containers}>
                    <img
                        className={styles.img}
                        src={`${image}`}
                        alt="cover"
                        width={512}
                        height={256}
                        draggable={false}
                    />
                    <div className={styles.spans}>
                        <span className={styles.firstspan}>
                            {name} {lastName}
                        </span>
                        <span className={styles.default}>{plays}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Albumcard;
