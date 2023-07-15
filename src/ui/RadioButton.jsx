import styles from './RadioButton.module.css'
import React from 'react'

export const RadioButton = ({ label, value, ...props }) => (
   <div className={styles.radioButton}>
      <input type="radio" id={value} value={value} {...props} />
      <label htmlFor={value}>{label}</label>
   </div>
)
