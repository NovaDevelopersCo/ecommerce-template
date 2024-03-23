'use client'

import { Button } from 'antd'

import { IProduct, useActions } from '@store/index'

const RemoveFromCartBtn = ({ product }: { product: IProduct }) => {
	const actions = useActions()
	return (
		<Button onClick={() => actions.decrementFromCart(product)}>
			Remove From Cart
		</Button>
	)
}

export default RemoveFromCartBtn
