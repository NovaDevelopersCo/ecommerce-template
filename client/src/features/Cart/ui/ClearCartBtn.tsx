'use client'

import { Button } from 'antd'

import { useActions } from '@store/index'

const ClearCartBtn = () => {
	const actions = useActions()
	return (
		<Button
			onClick={() => {
				actions.clearCart()
			}}
		>
			Clear Cart
		</Button>
	)
}

export default ClearCartBtn
