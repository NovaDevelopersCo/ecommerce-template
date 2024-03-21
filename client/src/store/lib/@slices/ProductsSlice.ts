import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IProduct } from '@entities/ProductCard'

import { productApi } from '../../api'

interface IProductsState {
	productList: IProduct[]
	isLoading: boolean
	error: null | string
}

const initialState: IProductsState = {
	productList: [],
	isLoading: false,
	error: null
}

// interface RejectedAction extends Action {
// 	error: Error
// }

// function isRejectedAction(action: Action): action is RejectedAction {
// 	return action.type.endsWith('rejected')
// }

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<IProduct>) {
			state.productList.push(action.payload)
		}
	},
	extraReducers: builder => {
		builder
			.addMatcher(
				productApi.endpoints.getAllProducts.matchPending,
				state => {
					console.log('Loading')
					state.isLoading = true
				}
			)
			.addMatcher(
				productApi.endpoints.getAllProducts.matchFulfilled,
				(state, action: PayloadAction<IProduct[]>) => {
					state.productList = action.payload
					state.isLoading = false
				}
			)
			.addMatcher(
				productApi.endpoints.getAllProducts.matchRejected,
				(state, action) => {
					state.error =
						action.error.message || 'An error occurred while fetch'
					state.isLoading = false
				}
			)
			.addDefaultCase((state, action) => {})
	}
})

export default productsSlice
