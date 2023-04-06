import { memo } from 'react'
import { Typography } from '../Typography'
import styles from './Input.module.scss'
import { IInputProps } from './types'

import cn from 'classnames'

const Input = ({
  label,
  id,
  className,
  labelSize,
  labelWeight,
  disabled,
  type,
  value,
  name,
  onChange,
  clearButton,
  error,
  state = 'default',
  contentSize = 'small',
  ...rest
}: IInputProps) => {
  const classNames = cn(styles.inputContainer, className)
  const inputClass = cn(
    styles.input,
    clearButton && styles.inputWithClearButton,
    styles[state],
    error && styles.error,
    styles[contentSize],
  )
  return (
    <div className={classNames}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          <Typography size={labelSize} weight={labelWeight}>
            {label}
          </Typography>
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          id={id}
          className={inputClass}
          disabled={disabled}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          {...rest}
        />
      </div>
    </div>
  )
}

export default memo(Input)
