import React from 'react'
import PropTypes from 'prop-types'
import styles from './alliances.module.scss'

const Bar = ({filled}) => (
	<div className={styles.Bar} style={{background: filled ? '#ffffff' : ''}} />
)

Bar.propTypes = {
	filled: PropTypes.bool,
}

Bar.defaultProps = {
	filled: false,
}

const Alliances = ({completedAlliances}) => {
	// Capitalize
	const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1)
	const getAllianceImg = (alliance) => require(`../assets/images/alliances/${capitalize(alliance)}.png`)
	return (
		<div className={styles.Alliances}>
			{completedAlliances.map(({name, progress}) => {
				const empty = progress.map(({current, max}, i) => {
					if (i === 0) {
						const j = max - current
						return j <= 0 ? 0 : j
					}
					const prev = progress[i - 1]
					if (prev.current > prev.max) {
						return max - current
					}
					return max - prev.max
				})
				return (
					<div className={styles.Alliance}>
						<div className={styles.Image}>
							<img src={getAllianceImg(name)} alt={name} />
						</div>
						<div className={styles.Progress}>
							<>
								{empty.map((n, i) => (
									<div className={styles.ProgressBar}>
										{[...Array(n)].map(() => <Bar />)}
										{[...Array(progress[0].max - n)].map(() => <Bar filled />)}
									</div>
								))}
							</>
						</div>
						<div className={styles.Text}>
							{`${progress[progress.length - 1].current} / ${progress[progress.length - 1].max}`}
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Alliances
