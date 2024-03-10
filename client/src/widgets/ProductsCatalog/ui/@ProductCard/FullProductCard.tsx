import { FC } from 'react'

import { AddToCartBtn } from '@features/AddToCart'

import { IProduct, ProductCard } from '@entities/ProductCard'

type TFullProductCardProps = {
	product: IProduct
}

const FullProductCard: FC<TFullProductCardProps> = ({ product }) => (
	// eslint-disable-next-line react/jsx-key
	<ProductCard product={product} actions={[<AddToCartBtn />]} />
)

export default FullProductCard
