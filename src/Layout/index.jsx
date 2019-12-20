import React from 'react'
import PropTypes from 'prop-types'
import styles from './layout.module.scss'

const Layout = ({children, full}) => (
	<div className={full ? styles.FullWidth : styles.Layout}>{children}</div>
)

Layout.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element).isRequired,
	full: PropTypes.bool,
}

Layout.defaultProps = {
	full: false,
}

export default Layout
