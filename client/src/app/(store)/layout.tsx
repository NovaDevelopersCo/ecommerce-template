import { PropsWithChildren } from 'react'

import { v4 as uuid } from 'uuid'

import { BannerAntd } from '@widgets/Banner'

export default function StoreLayout({ children }: PropsWithChildren<unknown>) {
	return <>{children}</>
}
