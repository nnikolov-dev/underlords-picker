import React from 'react'
import styles from './heading.module.scss'
import img from '../assets/images/heading.png'

const Heading = () => (
	<div className={styles.Heading} style={{background: `url(${img})`}}>
		<div className={styles.Text}>
			<h2>Solo Composer</h2>
		</div>
	</div>
)

export default Heading
