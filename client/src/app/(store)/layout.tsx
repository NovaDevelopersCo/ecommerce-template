import { PropsWithChildren } from 'react'

import { Banner } from '@widgets/Banner'

export default function StoreLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<main className='p-2'>
			{/* <Banner /> */}
			<h1>Store layout</h1>
			{children}
		</main>
	)
}
