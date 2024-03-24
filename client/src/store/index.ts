import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { productApi, authApi } from './api'
import { productsSlice, authSlice, cartSlice } from './lib'
import StoreProvider from './ui/StoreProvider'

export const makeStore = () =>
	configureStore({
		reducer: combineSlices(productsSlice, /*authSlice,*/ cartSlice, productApi, /*authApi*/),
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(
				productApi.middleware,
				// authApi.middleware
			)
	})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export { StoreProvider }

export * from './lib'
export * from './api'
export * from './model'
