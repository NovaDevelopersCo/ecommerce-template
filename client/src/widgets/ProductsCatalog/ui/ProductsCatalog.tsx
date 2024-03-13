'use client'

import { useState } from 'react'

import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'

import { useGetAllProductsQuery } from '@store/index'


import { IProduct } from '@entities/ProductCard'


import Paggination from './@Paggination/Paggination'
import FullProductCard from './@ProductCard/FullProductCard'

type TServerSideProps = {
	data: IProduct[] | undefined
	error: FetchBaseQueryError | undefined
	isError: boolean
	isLoading: boolean
}

// SSR request
// eslint-disable-next-line react-refresh/only-export-components
// export const getServerSideProps = (async () => {
// 	const { data, error, isLoading, isError,  } = useGetAllProductsQuery({
// 		page: 1,
// 		limit: 12
// 	})

// 	return { props: { data, error, isError, isLoading } }
// }) satisfies GetServerSideProps<TServerSideProps>
/**
 * {
	data,
	error,
	isError,
	isLoading
}: InferGetServerSidePropsType<typeof getServerSideProps>
 */

const ProductsCatalog = () => {
	const [page, setPage] = useState<number>(1)
	const [limit, setLimit] = useState<number>(12)
	const { data, error, isLoading, isError } = useGetAllProductsQuery({
		page: page,
		limit: limit
	})
	if (isError && (error as FetchBaseQueryError))
		return (
			<h1>
				{error.status} {JSON.stringify(error.data)}
			</h1>
		)
	if (isLoading) return <h1>Loading ...</h1>

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
				{data?.map(product => (
					<FullProductCard product={product} key={product.id} />
			</div>
			{/* <Paggination page={page} /> */}
		</div>
	)
}

export default ProductsCatalog
