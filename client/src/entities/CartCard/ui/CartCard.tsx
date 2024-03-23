import { ReactNode } from 'react'

import { ICartElem } from '@store/index'

const CartCard = ({ cartElem, featureList }: { cartElem: ICartElem, featureList?: ReactNode[] }) => {
	return (
		<div className='flex flex-row justify-between'>
			<div className='flex flex-col'>
				<h1>{cartElem.item.name}</h1>
				<h6>{cartElem.item.description}</h6>
			</div>
			<div className='flex flex-col'>
				{...featureList}
				<h6>{cartElem.count}</h6>
			</div>
		</div>
	)
}

export default CartCard
