import React from 'react'
import PropTypes from 'proptypes'
import styles from './hero.module.scss'

export default function Hero({hero, onSelect}) {
	// Capitalize
	const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1)

	// Formatting the name of each hero
	const format = (str) => {
		const splitStr = str.toLowerCase().split('_')
		return splitStr.map((s, i) => {
			if (s !== 'of' && s !== 'the') {
				return capitalize(s)
			}
			return s
		}).join('-')
	}

	// Getting the image for a hero
	const getImg = (hero) => require(`../assets/images/heroes/${format(hero)}.jpg`)

	// Getting the image of an alliance
	const getAlliance = (alliance) => require(`../assets/images/alliances/${capitalize(alliance)}.png`)

	const name = format(hero.key).replace(/-/g, ' ')

	if (onSelect) {
		return (
			<div className={styles.Tooltip}>
				<div onClick={(e) => (onSelect(hero))}>
					<img src={getImg(hero.key)} className={styles.Image} alt="Hero" />
				</div>
				<div className={styles.Right}>
					<h3>{name}</h3>
					<div style={{display: 'flex', flexDirection: 'row'}}>{hero.alliance.map((alliance) => (<img src={getAlliance(alliance)} alt={alliance} style={{width: '30%'}} />))}</div>
					Tier: {hero.draftTier} ({hero.goldCost} Gold)<br />
					Damage Min: {hero.damageMin.join('/')}<br />
					Damage Max: {hero.damageMax.join('/')}<br />
					Attack Rate: {hero.attackRate}<br />
					Attack Range: {hero.attackRange}<br />
					Health: {hero.health.join('/')}
					<i />
				</div>
			</div>
		)
	}
	return (
		<img src={getImg(hero.key)} className={styles.Image} alt={name} />
	)
}
