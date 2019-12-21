import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../TextInput'
import styles from './header.module.scss'
import logo from '../assets/images/logo.png'

const Header = ({squares}) => (
	<div className={styles.Header}>
		<div className={styles.Logo}>
			<div className={styles.Image}>
				<img src={logo} alt="Undelords Composer" />
			</div>
			<h2>Underlords Composer</h2>
		</div>
		<div className={styles.Share}>
			<TextInput name="Share" value={`http://localhost:3000/build/${btoa(JSON.stringify(squares))}`} />
		</div>
	</div>
)

Header.propTypes = {
	squares: PropTypes.arrayOf(PropTypes.shape()),
}

Header.defaultProps = {
	squares: [],
}

export default Header
