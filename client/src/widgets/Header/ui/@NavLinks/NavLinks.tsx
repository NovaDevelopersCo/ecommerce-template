import { Dispatch, SetStateAction } from 'react'
import React from 'react'

import { Dropdown, MenuProps } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'

const NavLinks = ({
	isBurgerActive,
	setIsBurgerActive
}: {
	isBurgerActive: boolean
	setIsBurgerActive: Dispatch<SetStateAction<boolean>>
}) => {
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <Link href='/catalog/category/child'>Child</Link>
		},
		{
			key: '2',
			label: <Link href='/catalog/category/men'>Mens</Link>
		},
		{
			key: '3',
			label: <Link href='/catalog/category/women'>Women</Link>
		}
	]
	return (
		<ul
			className={clsx(
				'-z-10 md:z-10 flex justify-around md:bg-transparent bg-black/50 backdrop-blur-sm md:w-fit md:h-auto gap-x-4 md:flex-row flex-col md:relative fixed top-0 left-0 md:translate-y-0 w-screen h-screen items-center',
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
	)
}

export default NavLinks
