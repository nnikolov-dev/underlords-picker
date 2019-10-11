import React from 'react'
import PropTypes from 'proptypes'
import styles from './hero.module.scss'

export default function Hero({id}) {
	return (
		<div className={styles.Hero}>
			<img src={require(`../images/heroes/${id}_hero.png`)} alt="Hero" />
			<div className={styles.Holder}>
				<span className={styles.Name}>
                    Hero Name
				</span>
			</div>
		</div>
	)
}

Hero.propTypes = {
	id: PropTypes.number.isRequired,
}
