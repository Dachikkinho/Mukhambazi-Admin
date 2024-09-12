import React, { useEffect } from 'react';
import styles from './Textdraw.module.scss';

const Textdraw = ({ message, onClose, show }: { message: string, onClose: () => void, show: boolean }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <div className={`${styles.textdraw} ${show ? styles.show : ''}`}>
            {message}
        </div>
    );
};

export default Textdraw;
