import { FC, HTMLAttributes } from 'react'

import { Button } from 'antd'

type TAddToCartBtnProps = object & HTMLAttributes<HTMLButtonElement>

const AddToCartBtn: FC<TAddToCartBtnProps> = ({ ...props }) => {
	return (
		<Button block {...props}>
			Add to cart
		</Button>
	)
}

export default AddToCartBtn
