'use client'

import { Button } from 'antd'
import { v4 as uuid } from 'uuid'

import { ICartElem, useAppSelector } from '@store/index'

import { AddToCartBtn, ClearCartBtn, RemoveFromCartBtn } from '@features/Cart'

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
								<AddToCartBtn product={el.item} key={uuid()} />,
								<RemoveFromCartBtn
									product={el.item}
									key={uuid()}
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
