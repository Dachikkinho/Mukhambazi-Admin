import styles from '../../(authorised)/addArtist/page.module.scss';
import { Done } from '@/app/components/Done/Done';

type Props = {
    id: string;
    uploadedName: string;
    deleting: boolean;
};

export const FormStatus = ({ id, uploadedName, deleting }: Props) => (
    <div className={styles.uploadedCont}>
        <Done />
        <h6 className={styles.success}>
            Artist {deleting ? 'Deleted!' : id ? 'Updated' : 'Uploaded'}
        </h6>
        <p className={styles.name}>
            {uploadedName}{' '}
            {deleting
                ? 'Deleted Successfully!'
                : id
                  ? 'Updated Successfully!'
                  : 'Added on Platform'}
        </p>
    </div>
);
