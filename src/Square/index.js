import React from 'react'
import styles from './square.module.scss'
import Hero from '../Hero'

export default function Square({id, onSelect, hero, selected, even}) {
	const squareStyle = {background: even ? '#547AB1' : '#B5CAE9'}
	if (selected) {
	  return <div className={styles.Square} onClick={() => onSelect(id)} style={squareStyle}>{hero ? <Hero hero={hero} /> : null}</div>
	}
	return <div className={styles.Selected} onClick={() => onSelect(id)} style={squareStyle}>{hero ? <Hero hero={hero} /> : null}</div>
}
