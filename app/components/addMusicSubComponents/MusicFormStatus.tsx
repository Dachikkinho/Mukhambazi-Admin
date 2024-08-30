import styles from '../../(authorised)/addMusic/page.module.scss';
import { Done } from '@/app/components/Done/Done';

type Props = {
    id: string;
    uploadedName: string;
};

export const MusicFormStatus = ({ id, uploadedName }: Props) => (
    <div className={styles.uploadedCont}>
        <Done />
        <h6 className={styles.success}>Music {id ? 'Updated' : 'Uploaded'}</h6>
        <p className={styles.name}>
            {uploadedName} {id ? 'Updated' : 'Added'} in Music
        </p>
    </div>
);
