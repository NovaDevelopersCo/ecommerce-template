'use client'

import { Button } from 'antd'

import { ICartElem, useAppSelector } from '@store/index'

import { AddToCartBtn } from '@features/AddToCart'
import { ClearCartBtn } from '@features/ClearCart'
import { RemoveFromCartBtn } from '@features/RemoveFromCart'

import { CartCard } from '@entities/CartCard'

const CartList = () => {
	const cartList = useAppSelector(state => state.cart.cart)
	return (
		<div className='flex flex-col'>
			{cartList.length != 0 ? (
				<>
					{cartList.map((el: ICartElem, idx: number) => (
						<CartCard
							cartElem={el}
							key={idx}
							featureList={[
								<AddToCartBtn product={el.item} key={idx} />,
								<RemoveFromCartBtn
									product={el.item}
									key={idx}
								/>
							]}
						/>
					))}
					<Button>To payment</Button>
					<ClearCartBtn />
				</>
			) : (
				<h1>Seems like there is no products in your cart</h1>
			)}
		</div>
	)
}

export default CartList
