import React from 'react'
import Layout from '../Layout'
import Square from '../Square'
import Alliances from '../Alliances'
import styles from './board.module.scss'

const Board = ({data, onSelect, selectedHero, completedAlliances}) => {
	let row = 0
	return (
		<Layout full>
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
			</div>
		</Layout>
	)
}

export default Board
