import { IButtonProps } from "./types"

import cn from 'classnames'

import styles from './Button.module.scss'

const Button = ({title, size = 'medium', className, onClick}: IButtonProps) => {
    const classNames = cn(styles[size], className, styles.button)

    return (
        <button onClick={onClick} className={classNames}>{title}</button>
    )
}

export default Button