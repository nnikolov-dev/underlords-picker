import React from 'react'
import './Main.css'
import Hero from '../Hero'

export default () => (
	<div className="Main">
		<div className="Logo">
			{/* Logo */}
		</div>
		<div className="Heroes" />
		{/* {[...Array(108).keys()].map((value) => <Hero id={value} />)} */}
		<div className="Board">
			{/* <Hero id={1} />
			<Hero id={2} />
			<Hero id={3} />
			<Hero id={4} />
			<Hero id={5} />
			<Hero id={6} />
			<Hero id={7} />
			<Hero id={8} />
			<Hero id={9} />
			<Hero id={10} />
			<Hero id={11} />
			<Hero id={12} /> */}
			{[...Array(32).keys()].map(() => <div className="Empty" />)}
		</div>
		<div className="Alliances">
			Alliances
		</div>
	</div>
)
