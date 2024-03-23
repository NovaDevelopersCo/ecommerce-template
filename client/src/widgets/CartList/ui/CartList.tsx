'use client'

import { useAppSelector } from '@store/index'

import { AddToCartBtn } from '@features/AddToCart'

import { CartCard } from '@entities/CartCard'

const CartList = () => {
	const cartList = useAppSelector(state => state.cart.cart)
	return (
		<div className='flex flex-col'>
			{cartList.length != 0 ? (
				cartList.map((el, idx) => (
					<CartCard
						cartElem={el}
						key={idx}
						featureList={[
							<AddToCartBtn product={el.item} key={idx} />
						]}
					/>
				))
			) : (
				<h1>Seems like there is no products in your cart</h1>
			)}
		</div>
	)
}

export default CartList
