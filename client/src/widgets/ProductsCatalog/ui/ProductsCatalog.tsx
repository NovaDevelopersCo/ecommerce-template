'use client'

import { useState } from 'react'

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { useGetAllProductsQuery } from '@store/index'

import { IProduct } from '@entities/ProductCard'

import { Loading } from '@shared/ui'

import Paggination from './@Paggination/Paggination'
import FullProductCard from './@ProductCard/FullProductCard'

const ProductsCatalog = () => {
	const [page, setPage] = useState<number>(1)
	const [limit, setLimit] = useState<number>(6)
	const { data, isLoading, isError, error } = useGetAllProductsQuery({
		page,
		limit
	})

	const { items, total } = data

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
				{products?.map((product: IProduct) => (
					<FullProductCard product={product} key={product.id} />
				)) || 'No products'}
			</div>
			<Paggination
				page={page}
				limit={limit}
				total={total}
				setPage={setPage}
			/>
		</>
	)
}

export default ProductsCatalog
