import React from 'react'
import styles from './LinkSelectGame.module.css'
import { Link } from 'react-router-dom'
import { TbArrowBigRightLinesFilled } from 'react-icons/tb'

export const LinkSelectGame = ({ children, to, ...props }) => (
   <Link to={to} {...props} className={styles.link}>
      {children} {<TbArrowBigRightLinesFilled />}
   </Link>
)
