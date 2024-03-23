'use client'

import { FC, HTMLAttributes } from 'react'

import { Button } from 'antd'

import { useActions } from '@store/index'

import { IProduct } from '@entities/ProductCard'

type TAddToCartBtnProps = {
	product: IProduct
} & HTMLAttributes<HTMLButtonElement>

const AddToCartBtn: FC<TAddToCartBtnProps> = ({ product, ...props }) => {
	const action = useActions()

	return (
		<Button
			block
			{...props}
			onClick={e => {
				e.stopPropagation()
				action.addToCart(product)
			}}
		>
			Add to cart
		</Button>
	)
}

export default AddToCartBtn
