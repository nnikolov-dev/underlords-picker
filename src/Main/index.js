import React, {useState} from 'react'
import styles from './main.module.scss'
import Hero from '../Hero'
import Square from '../Square'
import alliencesData from '../alliences.json'


export default () => {
	const [selectedHero, setSelectedHero] = useState(null)
	const [squares, setSquares] = useState([...Array(32).keys()].map((value) => ({square: value, hero: null})))
	const [completedAlliances, setCompletedAlliances] = useState([])
	const [currentAlliance, setCurrentAlliance] = useState(null)
	const alliances = []
	const heroes = []

	// Capitalize
	const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1)

	const getAllianceImg = (alliance) => require(`../images/alliances/${capitalize(alliance)}.png`)

	const countCompleted = (allAlliances) => [...new Set(allAlliances)].map((alliance) => {
		const progress = []
		alliances.filter((a) => (a.name === alliance))[0].levels.forEach((l) => {
			const current = allAlliances.filter((x) => (x === alliance)).length
			const max = l.unitcount
			progress.push({current, max})
		})
		console.log({name: alliance, progress})
		return {name: alliance, progress}
	})

	const countAlliances = (s) => {
		const passed = []
		const heroAlliances = []
		s.forEach(({hero}) => {
			if (hero && !passed.includes(hero.key)) {
				heroAlliances.push(...hero.alliance)
				passed.push(hero.key)
			}
		})
		setCompletedAlliances(countCompleted(heroAlliances))
	}

	const setHeroSquare = (s) => {
		const newSquares = squares.map(({square, hero}) => (square === s ? {square, hero: selectedHero} : {square, hero}))
		setSquares(newSquares)
		countAlliances(newSquares)
		setSelectedHero(null)
	}

	const handleHeroSelect = (hero) => {
		setSelectedHero(hero)
	}

	const handleSquareSelect = (id) => {
		setHeroSquare(id)
	}

	Object.keys(alliencesData).forEach((key) => {
		const alliance = alliencesData[key]
		key = key
			.replace('dwarf', 'deadeye')
			.replace('undead', 'heartless')
			.replace('goblin', 'scrappy')
			.replace('elf', 'elusive')
			.replace('naga', 'scaled')
			.replace('demonhunter', 'demon Hunter')
			.replace('ogre', 'Blood-Bound')
		if (alliance.heroes.length > 0) {
			alliance.heroes.forEach((hero) => {
				if (hero.key === 'furion') return
				const match = heroes.filter((h) => (h.key === hero.key))
				if (match.length === 0) {
					hero.alliance = [key]
					heroes.push(hero)
				} else {
					match[0].alliance.push(key)
					heroes.map((h) => (h.key === hero.key ? match[0] : h))
				}
			})
			alliances.push({name: key, levels: alliance.levels})
		}
	})

	return (
		<div className={styles.Main}>
			<div className={styles.Logo}>
				{/* Logo */}
			</div>
			<div className={styles.Board}>
				{squares.map(({square, hero}) => <Square id={square} onSelect={handleSquareSelect} hero={hero} selected={selectedHero} />)}
			</div>
			<div className={styles.Search}>
				<div className={styles.Alliances}>
					<span className={styles.All} onClick={() => (setCurrentAlliance(null))}>All</span>
					{alliances.map((({name}) => (
						<img src={getAllianceImg(name)} className={styles.Image} onClick={() => (setCurrentAlliance(name))} />
					)))}
				</div>
			</div>
			<div className={styles.Heroes}>
				{heroes.map((hero, i) => {
					if (currentAlliance) { return hero.alliance.includes(currentAlliance) ? <Hero key={i} hero={hero} onSelect={handleHeroSelect} /> : null }
					return (<Hero key={i} hero={hero} onSelect={handleHeroSelect} />)
				})}
			</div>
			<div className={styles.Alliances}>
				{completedAlliances.map(({name, progress}) => (
					<div className={styles.Alliance}>
						<div style={{maxWidth: '100px'}}>
							<img src={getAllianceImg(name)} className={styles.Image} alt={name} />
						</div>
						<div className={styles.Progress}>
							{
								progress.map((n, i) => (
									<div className={styles.ProgressBar}>
										{
											(n.current / n.max >= 1)
												// Full
												? [...Array(progress[progress.length - 1].max / progress.length)].map(() => <div className={styles.Bar} style={{border: ' 1px solid rgba(255, 255, 255, 0.3)'}} />)
												// Not Full
												: (i === 0 || (n.current > progress[i - 1].max))
													? [...Array(i === 0 ? n.current : n.current - (n.max - progress[i - 1].max))].map(() => <div className={styles.Bar} />)
													: null
										}
									</div>
								))
							}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
