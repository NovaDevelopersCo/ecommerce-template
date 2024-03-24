import { Action, PayloadAction } from '@reduxjs/toolkit'
import {
	FetchArgs,
	FetchBaseQueryMeta,
	createApi,
	fetchBaseQuery
} from '@reduxjs/toolkit/query/react'

import type { RootState } from '@store/index'

import { IProduct } from '@entities/ProductCard'

import { TServerResponse } from '../model'

type GetAllProductsAPIParams = {
	page: number
	limit: number
}

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
	}),
	tagTypes: ['Products'],
	endpoints: builder => ({
		getAllProducts: builder.query<
			TServerResponse<IProduct[]>,
			GetAllProductsAPIParams
		>({
			query: ({ page, limit }) => ({
				url: 'product',
				params: {
					count: limit,
					page: page
				},
				providesTags: () => ['Products']
			})
		}),
		getAllProductsWithoutExtra: builder.query<
			TServerResponse<IProduct[]>,
			GetAllProductsAPIParams
		>({
			query: ({ page, limit }) => ({
				url: 'product',
				params: {
					count: limit,
					page: page
				},
				providesTags: () => ['Products']
			})
		}),
		getProductById: builder.query<IProduct, string>({
			query: id => ({
				url: `product/${id}`
			})
		})
	})
})

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi
