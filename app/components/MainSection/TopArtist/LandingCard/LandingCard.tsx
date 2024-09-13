import Link from 'next/link';
import styles from '../LandingCard/LandingCard.module.scss';

type Props = {
    bgColor: string;
    name: string;
    plays: number;
    img: string;
    id: number;
};

const LandingCard = ({ bgColor, name, plays, img, id }: Props) => {
    return (
        <div className={styles.wrap}>
            <Link href={`/addArtist?id=${id}`} className={styles.editButton}>
                <img
                    src="/icons/edit.svg"
                    alt="edit"
                    className={styles.edit}
                    width={20}
                    height={20}
                />
            </Link>
            <div
                className={styles.mainContainer}
                style={{
                    background: bgColor,
                }}
            >
                <img
                    src={img}
                    className={styles.pfp}
                    alt="pfp"
                    draggable={false}
                />
                <h6 className={styles.name}>{name}</h6>
                <p className={styles.plays}>{plays} Plays</p>
            </div>
        </div>
    );
};

export default LandingCard;
