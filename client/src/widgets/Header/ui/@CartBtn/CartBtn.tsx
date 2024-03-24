import { Dispatch, SetStateAction } from 'react'

import Link from 'next/link'

const CartBtn = ({
	setIsCartActive
}: {
	setIsCartActive: Dispatch<SetStateAction<boolean>>
}) => {
	return (
		<>
			<Link
				href='/cart'
				className='md:order-none order-2 lg:hidden block'
			>
				Cart
			</Link>
			<button
				className='md:order-none order-2 lg:block hidden'
				onClick={() => setIsCartActive(true)}
			>
				Show Cart
			</button>
		</>
	)
}

export default CartBtn
