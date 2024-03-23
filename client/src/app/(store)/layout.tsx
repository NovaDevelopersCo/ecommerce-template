import { PropsWithChildren } from 'react'

import { Banner } from '@widgets/Banner'

export default function StoreLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			{/* <Banner /> */}
			{children}
		</>
	)
}
