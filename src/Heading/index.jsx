import React from 'react'
import styles from './heading.module.scss'
import img from '../assets/images/heading.png'

const Heading = () => (
	<div className={styles.Heading}>
		<div className={styles.Image}>
			<img src={img} alt="Heading" />
		</div>
		<div className={styles.Text}>
			<h2>Heading</h2>
		</div>
	</div>
)

export default Heading
