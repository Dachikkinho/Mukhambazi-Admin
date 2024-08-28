import styles from "./ErrorMessage.module.scss"

type Props = {
    message: string;
}

export function ErrorMessage({message}: Props) {
    return (
        <p className={styles.error}>{message}</p>
    )
}