'use client'

import { useState } from 'react'

import { Menu } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

import { LogoutBtn, SignInUpBtn } from '@features/Auth'
import { SearchForm } from '@features/Search'

import { Logo } from '@shared/ui'

import CartAside from './@CartAside/CartAside'
import CartBtn from './@CartBtn/CartBtn'
import NavLinks from './@NavLinks/NavLinks'

const Header = () => {
	const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false)
	const [isCartActive, setIsCartActive] = useState<boolean>(false)

	const { data: session } = useSession()
	return (
		<header className='w-full sticky p-5 z-[100]'>
			<div className='flex flex-row justify-between items-center gap-x-6'>
				<Logo />
				<nav className='flex flex-row gap-x-6 items-center md:contents'>
					<NavLinks
						isBurgerActive={isBurgerActive}
						setIsBurgerActive={setIsBurgerActive}
					/>

					<div className='flex flex-row gap-x-6 items-center'>
						<SearchForm />

						{!session ? (
							<SignInUpBtn />
						) : (
							<>
								<button className='flex flex-row items-center gap-x-2'>
									<p className='lg:block hidden'>
										{session.user?.name}
									</p>
									{/* <p>{session.user?.email}</p> */}
									<Image
										src={session.user?.image as string}
										width='50'
										height='50'
										alt=''
										className='object-cover rounded-full'
									/>
								</button>
								<LogoutBtn />
							</>
						)}
						<CartBtn setIsCartActive={setIsCartActive} />
						<button
							className='md:hidden block order-last'
							onClick={() => setIsBurgerActive(prev => !prev)}
						>
							<Menu />
						</button>
					</div>
				</nav>

				<CartAside
					isCartActive={isCartActive}
					setIsCartActive={setIsCartActive}
				/>
			</div>
		</header>
	)
}

export default Header
