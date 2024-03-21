'use client'

import { FC, PropsWithChildren, ReactNode, useEffect, useState } from 'react'

import { Card, Skeleton } from 'antd'
import Meta from 'antd/es/card/Meta'
import Image from 'next/image'

import { IProduct } from '../model'

/**
 * The type `TProductCardProps` defines the props expected by a product card component in a TypeScript
 * React application.
 * @property {IProduct} product - The `product` property in the `TProductCardProps` type represents an
 * object of type `IProduct`. This object likely contains information about a specific product, such as
 * its name, price, description, and other relevant details.
 * @property {ReactNode[] | undefined} actions - The `actions` property in the `TProductCardProps` type
 * represents an array of React nodes or `undefined`. This property is typically used to pass down
 * action buttons or links that can be displayed on the product card component.
 */
type TProductCardProps = {
	product: IProduct
	actions: ReactNode[] | undefined
}

const ProductCard: FC<PropsWithChildren<TProductCardProps>> = ({
	product,
	actions
}) => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(false)
	}, [])

	return (
		<Card
			actions={actions}
			hoverable
			cover={
				<Image
					src={product.cover}
					alt={product.name}
					width={300}
					height={300}
					style={{ maxHeight: '50svh', objectFit: 'cover' }}
				/>
			}
		>
			<Skeleton loading={loading} active>
				<Meta title={product.name} description={product.description} />
			</Skeleton>
		</Card>
	)
}

export default ProductCard
