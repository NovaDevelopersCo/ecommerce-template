import { useState } from 'react'

import { useGetAllProductsQuery } from '@store/index'

import { IProduct } from '@entities/ProductCard'

import Paggination from './@Paggination/Paggination'
import FullProductCard from './@ProductCard/FullProductCard'

// type TProductCatalogProps = {
// 	page: number
// 	limit: number
// }

const ProductsCatalog = () => {
	// const { products, total } = await fetchAllProducts(page, limit)
	// console.log(page)
	const [page, setPage] = useState<number>(1)
	const {
		data: products,
		isLoading,
		isError,
		error
	} = useGetAllProductsQuery(page)

	return (
		<>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					width: '100%',
					gap: '10px'
				}}
			>
				{products.map((product: IProduct) => (
					<FullProductCard product={product} key={product.id} />
				)) || 'No products'}
			</div>
			<Paggination page={page} limit={limit} total={total} />
		</>
	)
}

export default ProductsCatalog
