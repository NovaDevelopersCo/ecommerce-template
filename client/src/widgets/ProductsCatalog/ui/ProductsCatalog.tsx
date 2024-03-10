'use client'

import { FC, useState } from 'react'

// eslint-disable-next-line import/no-internal-modules
import products from '../api/Products.test.json'
import Paggination from './@Paggination/Paggination'
import FullProductCard from './@ProductCard/FullProductCard'

const ProductsCatalog: FC = () => {
	const [page, setPage] = useState(0)

	return (
		<div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					width: '100%',
					gap: '10px'
				}}
			>
				{products.map(product => (
					<FullProductCard product={product} key={product.id} />
				))}
			</div>
			<Paggination />
		</div>
	)
}

export default ProductsCatalog
