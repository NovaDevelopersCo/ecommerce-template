import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICartElem, IProduct } from '@store/model'

interface ICartState {
	cart: ICartElem[]
	isLoading: boolean
	error: null | string
}

const initialState: ICartState = {
	cart: [],
	isLoading: false,
	error: null
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<IProduct>) {
			const prevElem = state.cart.find(
				elem => elem.item._id == action.payload._id
			)
			if (prevElem) {
				prevElem.count += 1
				return
			}
			const newElem = {
				item: action.payload,
				count: 1
			}
			state.cart.push(newElem)
		},
		removeElemFromCart(state, action: PayloadAction<IProduct>) {
			state.cart = state.cart.filter(
				elem => elem.item._id != action.payload._id
			)
		},
		decrementFromCart(state, action: PayloadAction<IProduct>) {
			const prevElem = state.cart.find(
				elem => elem.item._id == action.payload._id
			)!
			if (prevElem.count == 1) {
				state.cart = state.cart.filter(
					elem => elem.item._id != action.payload._id
				)
				return
			}
			prevElem.count -= 1
		},
		clearCart: state => {
			state = initialState
		}
	}
})

export default cartSlice
