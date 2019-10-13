import React from 'react'
import styles from './square.module.scss'
import Hero from '../Hero'

export default function Square({id, onSelect, hero, selected}) {
	if (selected) {
	  return <div className={styles.Square} onClick={() => onSelect(id)}>{hero ? <Hero hero={hero} /> : null}</div>
	}
	return <div className={styles.Selected} onClick={() => onSelect(id)}>{hero ? <Hero hero={hero} /> : null}</div>
}
