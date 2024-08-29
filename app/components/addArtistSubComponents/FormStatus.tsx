import styles from '../../(authorised)/addArtist/page.module.scss';
import { Done } from '@/app/components/Done/Done';

type Props = {
    id: string,
    uploadedName: string
}

export const FormStatus = ({ id, uploadedName }: Props) => (
    <div className={styles.uploadedCont}>
        <Done />
        <h6 className={styles.success}>Artist {id ? 'Updated' : 'Uploaded'}</h6>
        <p className={styles.name}>
            {uploadedName} {id ? 'Updated Successfully!' : 'Added on Platform'}
        </p>
    </div>
);
