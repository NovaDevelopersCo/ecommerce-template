import { PropsWithChildren } from 'react'

import { BannerAntd } from '@widgets/Banner'

import {v4 as uuid} from 'uuid'

export default function StoreLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			{children}
		</>
	)
}
