'use client'

import Image from 'next/image'

import { useGetProductByIdQuery } from '@store/index'

import {Loading} from '@shared/ui'

export default function Page({ params }: { params: { productId: string } }) {
	const { productId } = params
	const { data, isLoading, isError, error } =
		useGetProductByIdQuery(productId)

	if (isLoading) return <Loading />
	if (isError)
		return (
			<h1>
				{error?.status}. {error?.message}
			</h1>
		)

	return (
		<div>
			<div>
				<Image
					width={300}
					height={300}
					alt={data.name}
					src={
						process.env.NEXT_PUBLIC_SERVER_URL +
						'/file/' +
						data.image
					}
				/>
			</div>
			<h1>{data.name}</h1>
			<h2>{data.description}</h2>
			<h3>{data.price}$</h3>
			<p>{data.stock} el</p>

			<div>
				{data.tags.map((el, idx) => (
					<p key={idx}>{tag}</p>
				))}
			</div>

			<h6>{data.createdAt}</h6>
			<h6>{data.updatedAt}</h6>
		</div>
	)
}
