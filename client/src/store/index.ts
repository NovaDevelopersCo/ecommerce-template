import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { productApi } from './api/ProductApi'
import { productsSlice } from './lib'
import StoreProvider from './ui/StoreProvider'

export const makeStore = () =>
	configureStore({
		reducer: combineSlices(productsSlice, productApi),
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(
				productApi.middleware
			)
	})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export { StoreProvider }

export * from './lib'
export * from './api'
