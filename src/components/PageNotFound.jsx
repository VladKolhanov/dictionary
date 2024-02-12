import styles from './PageNotFound.module.css'
import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import { BiShare } from 'react-icons/bi'

export const PageNotFound = props => {
	const navigate = useNavigate()
	return (
		<div className={styles.page}>
			<p className={styles.message}> Sorry! This page not found.</p>
			<Button icon={<BiShare />} type="button" onClick={() => navigate('/')}>
				Go to home page
			</Button>
		</div>
	)
}
