import { PropsWithChildren } from 'react'

export default function InfoLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div>
			<h1>Info layout</h1>
			{children}
		</div>
	)
}
