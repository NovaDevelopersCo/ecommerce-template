import { FC, PropsWithChildren, ReactNode } from 'react'

import { StoreProvider } from '@store/index'

const AppProvider: FC<PropsWithChildren<ReactNode>> = ({ children }) => (
	<StoreProvider>{children}</StoreProvider>
)

export default AppProvider
