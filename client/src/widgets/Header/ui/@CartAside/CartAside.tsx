'use client'

import { Dispatch, SetStateAction } from "react"
import { v4 as uuid } from 'uuid'

import { ICartElem, useAppSelector } from '@store/index'

import { ClearCartBtn, AddToCartBtn, RemoveFromCartBtn } from '@features/Cart'
import { Button } from 'antd'

import { CartCard } from '@entities/CartCard'

import clsx from 'clsx'

const CartAside = ({isCartActive, setIsCartActive}: {isCartActive: boolean, setIsCartActive: Dispatch<SetStateAction<boolean>>}) => {
	const cartList = useAppSelector(state => state.cart.cart)
  return (
	<aside
		className={clsx(
			'lg:block hidden fixed h-screen w-1/4 right-0 top-0 bg-black z-[9999] p-4',
			isCartActive ? 'translate-x-0' : 'translate-x-full'
		)}
	>
		<div className='flex flex-col'>
			<button onClick={() => setIsCartActive(false)}>
				Close
			</button>
			{cartList.length != 0 ? (
				<>
					{cartList.map((el: ICartElem, idx: number) => (
						<CartCard
							cartElem={el}
							key={idx}
							featureList={[
								<AddToCartBtn
									product={el.item}
									key={uuid()}
								/>,
								<RemoveFromCartBtn
									product={el.item}
									key={uuid()}
								/>
							]}
						/>
					))}
					<Button className='mt-auto'>To payment</Button>
					<ClearCartBtn />
				</>
			) : (
				<h1>
					Seems like there is no products in your cart
				</h1>
			)}
		</div>
	</aside>
  )
}

export default CartAside