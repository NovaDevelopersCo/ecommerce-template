'use client'

import { useState } from 'react'

import { useGetAllProductsQuery } from '@store/index'

import { IProduct } from '@entities/ProductCard'

import { Loading } from '@shared/ui'

import Paggination from './@Paggination/Paggination'
import FullProductCard from './@ProductCard/FullProductCard'

const ProductsCatalog = () => {
	const [page, setPage] = useState<number>(1)
	const [limit, setLimit] = useState<number>(6)
	const { isLoading, isError, error, data } = useGetAllProductsQuery({
		page,
		limit
	})

	if (isLoading) return <Loading />
	if (isError)
		return (
			<h1>
				{error?.status}. {error?.message}
			</h1>
		)
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
				{(data.count != 0 &&
					data?.items?.map((product: IProduct) => (
						<FullProductCard product={product} key={product._id} />
					))) ||
					'No products'}
			</div>
			<Paggination
				page={page}
				limit={limit}
				total={data?.count || 0}
				setPage={setPage}
			/>
		</>
	)
}

export default ProductsCatalog
