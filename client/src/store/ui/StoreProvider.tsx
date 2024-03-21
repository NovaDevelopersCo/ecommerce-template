'use client'

import { FC, PropsWithChildren, useRef } from 'react'
import { Provider } from 'react-redux'

import { AppStore, makeStore } from '..'

const StoreProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const storeRef = useRef<AppStore>()
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()

		// Automatically do some things
		// ...
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
