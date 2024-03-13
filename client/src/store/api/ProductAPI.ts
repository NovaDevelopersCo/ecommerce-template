import { Action, PayloadAction } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import type { RootState } from '@store/index'

import { IProduct } from '@entities/ProductCard'

type GetAllProductsAPIParams = {
	page: number
	limit: number
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
	return action.type === HYDRATE
}

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
	reducerPath: 'productApi',
	baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
	tagTypes: ['ProductsTag'],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	extractRehydrationInfo(action, { reducerPath }): any {
		if (isHydrateAction(action)) {
			return action.payload[reducerPath]
		}
	},
	endpoints: builder => ({
		getAllProducts: builder.query<IProduct[], GetAllProductsAPIParams>({
			query: ({ page, limit }) => ({
				url: '/products',
				params: {
					_limit: limit,
					_page: page
				},
				providesTags: () => ['ProductsTag']
			})
		})
		// createPost: build.mutation<IPost, IPost>({
		// 	query: post => ({
		// 		url: `/posts`,
		// 		method: 'POST',
		// 		body: post
		// 	}),
		// 	invalidatesTags: ['Post']
		// }),
	})
})

export const { useGetAllProductsQuery } = productApi
