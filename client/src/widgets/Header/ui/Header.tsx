'use client'

import { useState } from 'react'

import { AutoComplete, Dropdown, MenuProps } from 'antd'
import clsx from 'clsx'
import { Menu } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
	const [search, setSearch] = useState<string>('')
	const [options, setOptions] = useState<DefaultOptionType[]>([])
	const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false)

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <Link href='/catalog/child'>Child</Link>
		},
		{
			key: '2',
			label: <Link href='/catalog/men'>Mens</Link>
		},
		{
			key: '3',
			label: <Link href='/catalog/women'>Women</Link>
		}
	]

	const handleSearch = (value: string) => {
		setOptions(() => {
			if (!value || value.includes('@')) {
				return []
			}
			return ['gmail.com', '163.com', 'qq.com'].map<DefaultOptionType>(
				domain => ({
					label: `${value}@${domain}`,
					value: `${value}@${domain}`
				})
			)
		})
	}

	return (
		<header className='w-screen sticky p-5 z-100'>
			<div className='flex flex-row justify-between items-center'>
				<div>
					<h1>Logo</h1>
				</div>
				<nav className='flex flex-row gap-x-6 items-center md:contents'>
					<ul
						className={clsx(
							'-z-10 md:z-10 flex justify-around md:bg-transparent backdrop-blur-sm md:w-fit md:h-auto gap-x-4 md:flex-row flex-col md:relative fixed top-0 left-0 md:translate-y-0 w-screen h-screen items-center',
							!isBurgerActive && '-translate-y-full'
						)}
						onClick={() => setIsBurgerActive(false)}
					>
						<div className='md:contents flex flex-col gap-8'>
							<Link href='/'>Home</Link>
							<Dropdown menu={{ items }} placement='bottom' arrow>
								<Link href='/catalog'>Catalog</Link>
							</Dropdown>
							<Link href='/articles'>Blog</Link>
							<Link href='/contact-us'>Contact us</Link>
							<Link href='/about-us'>About us</Link>
						</div>
					</ul>

					<div className='flex flex-row gap-x-6'>
						<button className='md:order-none order-2'>Cart</button>
						<form
							action={''}
							className='flex flex-row items-center'
						>
							<AutoComplete
								style={{
									width: '170px'
								}}
								options={options}
								onSearch={handleSearch}
								placeholder='Find something here ...'
								filterOption={(inputValue, option) =>
									option!.value
										.toUpperCase()
										.indexOf(inputValue.toUpperCase()) !==
									-1
								}
							/>
						</form>

						<button
							className='md:hidden block order-last'
							onClick={() => setIsBurgerActive(prev => !prev)}
						>
							<Menu />
						</button>
					</div>
				</nav>
			</div>
		</header>
	)
}

export default Header
