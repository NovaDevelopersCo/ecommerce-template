import { combineSlices, configureStore } from '@reduxjs/toolkit'

import { productApi } from './api/ProductAPI'
import { productsSlice, rtkQueryErrorLogger } from './lib'
import StoreProvider from './ui/StoreProvider'

export const makeStore = () =>
	configureStore({
		reducer: combineSlices(productsSlice, productApi),
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(
				productApi.middleware
				// rtkQueryErrorLogger
			)
	})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export { StoreProvider }

export * from './lib'
export * from './api'
