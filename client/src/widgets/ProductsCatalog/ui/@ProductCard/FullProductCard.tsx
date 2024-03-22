import { FC } from 'react'

import { AddToCartBtn } from '@features/AddToCart'

import { IProduct, ProductCard } from '@entities/ProductCard'

type TFullProductCardProps = {
	product: IProduct
}

const FullProductCard: FC<TFullProductCardProps> = async ({ product }) => (
	<ProductCard
		product={product}
		// eslint-disable-next-line react/jsx-key
		actions={[<AddToCartBtn product={product} />]}
	/>
)

export default FullProductCard
