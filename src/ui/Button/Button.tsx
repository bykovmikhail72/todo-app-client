import { IButtonProps } from "./types"

import cn from 'classnames'

import styles from './Button.module.scss'
import { memo } from "react"

const Button = ({title, size = 'small', className, onClick}: IButtonProps) => {
    const classNames = cn(styles[size], className, styles.button)

    return (
        <button onClick={onClick} className={classNames}>{title}</button>
    )
}

export default memo(Button)