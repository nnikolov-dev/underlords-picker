import React from 'react'
import TextInput from '../TextInput'
import styles from './header.module.scss'
import logo from '../assets/images/logo.png'

const Header = () => (
	<div className={styles.Header}>
		<div className={styles.Logo}>
			<div className={styles.Image}>
				<img src={logo} alt="Undelords Composer" />
			</div>
			<h2>Underlords Composer</h2>
		</div>
		<div className={styles.Share}>
			<TextInput name="Share" value="http://google.com" />
		</div>
	</div>
)

export default Header
