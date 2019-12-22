import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Sticky, StickyContainer} from 'react-sticky'
import styles from './main.module.scss'
import Hero from '../Hero'
import Layout from '../Layout'
import Header from '../Header'
import Heading from '../Heading'
import Board from '../Board'
import alliencesData from '../alliences.json'
import TextInput from '../TextInput'

export default () => {
	const [selectedHero, setSelectedHero] = useState(null)
	const [squares, setSquares] = useState([...Array(32).keys()].map((value) => ({square: value, hero: null})))
	const [completedAlliances, setCompletedAlliances] = useState([])
	const [currentAlliance, setCurrentAlliance] = useState(null)
	const alliances = []
	const heroes = []
	const {build} = useParams()

	useEffect(() => {
		if (build) {
			try {
				setSquares(JSON.parse(atob(build)))
			} catch (err) {
				console.log(err)
			}
		}
	}, build)

	const countCompleted = (allAlliances) => [...new Set(allAlliances)].map((alliance) => {
		const progress = []
		alliances.filter((a) => (a.name === alliance))[0].levels.forEach((l) => {
			const current = allAlliances.filter((x) => (x === alliance)).length
			const max = l.unitcount
			progress.push({current, max})
		})
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

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.substring(1)
	const getAllianceImg = (alliance) => require(`../assets/images/alliances/${capitalize(alliance)}.png`)

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
		<Layout style={{backgroundColor: '#2F3D51', boxShadow: '-4px 0px 4px rgba(0, 0, 0, 0.25), 4px 0px 4px rgba(0, 0, 0, 0.25)'}}>
			<StickyContainer>
				<Header squares={squares} />
				<Heading />
				<Sticky topOffset={650}>
					{({
						style,
						isSticky,
						wasSticky,
						distanceFromTop,
						distanceFromBottom,
						calculatedHeight
					}) => (
						<div className={styles.Board} style={style}>
							<Board
								data={squares}
								onSelect={handleSquareSelect}
								selectedHero={selectedHero}
								completedAlliances={completedAlliances}
							/>
						</div>
					)}
				</Sticky>
				<div className={styles.Main}>
					<div className={styles.Search}>
						<div className={styles.Alliances}>
							{/* <span className={styles.All} onClick={() => (setCurrentAlliance(null))}>All</span>
							{alliances.map((({name}) => (
								<img src={getAllianceImg(name)} className={styles.Image} onClick={() => (setCurrentAlliance(name))} />
							)))} */}
						</div>
					</div>
					<div className={styles.Filter}>
						<div className={styles.Search}>
							<TextInput name="Search" />
						</div>
						<div className={styles.Alliances}>
							{alliances.map((({name}) => (
								<div className={styles.Alliance}><img src={getAllianceImg(name)} className={styles.Image} onClick={() => (setCurrentAlliance(name))} /></div>
							)))}
						</div>
					</div>
					<div className={styles.Heroes}>
						{heroes.map((hero, i) => {
							if (currentAlliance) { return hero.alliance.includes(currentAlliance) ? <Hero key={i} hero={hero} onSelect={handleHeroSelect} /> : null }
							return (<Hero key={i} hero={hero} onSelect={handleHeroSelect} />)
						})}
					</div>
				</div>
			</StickyContainer>
		</Layout>
	)
}
