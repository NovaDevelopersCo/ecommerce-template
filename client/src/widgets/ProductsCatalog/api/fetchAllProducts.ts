import 'server-only'

import { IProduct } from '@entities/ProductCard'

export default async function fetchAllProducts(page: number, limit: number) {
	const url =
		process.env.SERVER_URL + `/products?_page=${page}&_limit=${limit}`
	const res = await fetch(url)

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	const products: IProduct[] = (await res.json()) || []
	const count: number = +res?.headers?.get('x-total-count') || 0

	return {
		products: products,
		total: count
	}
}
