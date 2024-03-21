'use client'

import { useState } from 'react'

const Header = () => {
	const [search, setSearch] = useState<string>('')

	return (
		<header className='w-screen sticky p-5'>
			<div className='flex flex-row'>
				<div>
					<h1>Logo</h1>
				</div>
				<nav>
					<ul className='flex flex-row'>
						<li>Home</li>
						<li>Catalog</li>
						<li>Contact us</li>
						<li>About us</li>
					</ul>
					<button>Cart</button>
					<form action={''}>
						<button type='submit'>Search</button>
						<input
							type='text'
							value={search}
							onChange={e => setSearch(e.target.value)}
						/>
					</form>
				</nav>
			</div>
		</header>
	)
}

export default Header
