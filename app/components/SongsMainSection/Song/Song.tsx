import { useState, useEffect } from 'react';
import AddSongButton from '../../AddSongButton/AddSongButton';
import LikeButton from '../../LikeButton/LikeButton';
import styles from './Song.module.scss';

type Props = {
    name: string;
    group: string;
    imageSrc: string;
    onClick?: () => void;
    songUrl: string;
};

const Song = ({ name, group, songUrl, imageSrc, onClick }: Props) => {
    const [duration, setDuration] = useState<string>('');

    useEffect(() => {
        const audio = new Audio(songUrl);

        const handleLoadedMetadata = () => {
            const audioDurationInSeconds = audio.duration;
            const minutes = Math.floor(audioDurationInSeconds / 60);
            const seconds = Math.floor(audioDurationInSeconds % 60);
            setDuration(`${minutes}:${seconds}`);
        };

        if (audio) {
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            return () => {
                audio.removeEventListener(
                    'loadedmetadata',
                    handleLoadedMetadata,
                );
            };
        }
    }, [songUrl]);
    return (
        <div className={styles.container}>
            <img
                src={imageSrc}
                alt="song cover"
                className={styles.imagePlaceHolder}
                draggable={false}
            />
            <div className={styles.info}>
                <p className={styles.name}>{name}</p>
                <p className={styles.name}>{group}</p>
                <div className={styles.infoBottom}>
                    <p className={styles.name}>{duration}</p>
                    <button className={styles.play} onClick={onClick}>
                        Play Now
                    </button>
                </div>
            </div>
            <div className={styles.add}>
                <AddSongButton songId={name} />
            </div>
            <div className={styles.like}>
                <LikeButton />
            </div>
        </div>
    );
};

export default Song;
