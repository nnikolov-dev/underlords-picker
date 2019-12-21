import React from 'react'
import Layout from '../Layout'
import Square from '../Square'
import Alliances from '../Alliances'
import styles from './board.module.scss'

const Board = ({data, onSelect, selectedHero, completedAlliances}) => {
	let row = 0
	return (
		<div className={styles.Board}>
			<Layout>
				<div className={styles.BoardInner}>
					<div className={styles.Squares}>
						{data.map(({square, hero}) => {
							if ([8, 16, 24].includes(square)) {
								row += 1
							}
							return (
								<Square
									id={square}
									onSelect={onSelect}
									hero={hero}
									selected={selectedHero}
									even={row % 2 ? !(square % 2) : square % 2}
								/>
							)
						})}
					</div>
					<div className={styles.Alliances}>
						<Alliances completedAlliances={completedAlliances} />
					</div>
				</div>
			</Layout>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220" style={{display: 'block'}}><path fill="rgb(16, 23, 32)" fill-opacity="1" d="M0,64L60,58.7C120,53,240,43,360,80C480,117,600,203,720,202.7C840,203,960,117,1080,90.7C1200,64,1320,96,1380,112L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
		</div>
	)
}

export default Board
