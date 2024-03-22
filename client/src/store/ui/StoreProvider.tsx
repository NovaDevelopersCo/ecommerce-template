'use client'

import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'

import { AppStore, makeStore } from '..'

const StoreProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const storeRef = useRef<AppStore | null>(null)
	if (!storeRef.current) {
		storeRef.current = makeStore()
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
