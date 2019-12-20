import React from 'react'
import PropTypes from 'prop-types'
import styles from './textinput.module.scss'

const TextInput = ({name, placeholder, value}) => (
	<div className={styles.TextInput}>
		<div className={styles.Name}>
			{name}
		</div>
		<input className={styles.Field} placeholder={placeholder} value={value} />
	</div>
)

TextInput.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
}

TextInput.defaultProps = {
	name: '',
	placeholder: '',
	value: '',
}

export default TextInput
