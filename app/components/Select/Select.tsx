import styles from "./Select.module.scss"
import { ReactNode } from "react"

type Props = {
    children: ReactNode;
    className?: string;
    onChange?: any
}

export function Select({children, className, onChange}: Props) {
    return (
        <select name="" id="" className={`${styles.select} ${className}`} onChange={onChange}>
            {children}
        </select>
    )
}