'use client'

import { FC, PropsWithChildren } from 'react'

import { SessionProvider } from 'next-auth/react'

import { StoreProvider } from '@store/index'

const AppProvider: FC<PropsWithChildren<object>> = ({ children }) => (
	<StoreProvider>
		<SessionProvider>{children}</SessionProvider>
	</StoreProvider>
)

export default AppProvider
