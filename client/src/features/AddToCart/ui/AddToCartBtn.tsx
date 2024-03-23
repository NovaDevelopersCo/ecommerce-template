'use client'

import { FC, HTMLAttributes } from 'react'

import { Button } from 'antd'

import { IProduct } from '@entities/ProductCard'

type TAddToCartBtnProps = {
	product: IProduct
} & HTMLAttributes<HTMLButtonElement>

const AddToCartBtn: FC<TAddToCartBtnProps> = ({ product, ...props }) => {
	return (
		<Button block {...props} onClick={() => {}}>
			Add to cart
		</Button>
	)
}

export default AddToCartBtn
