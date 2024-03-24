import { Dispatch, SetStateAction } from 'react'

import { Button } from 'antd'

const LoadMoreBtn = ({
	setList,
	queryWithOutExtra
}: {
	setList: Dispatch<SetStateAction<unknown[]>>
	queryWithOutExtra: unknown
}) => {
	const handler = () => {
		const { data } = queryWithOutExtra()
		setList(prev => [...prev, data.items])
	}

	return <Button onClick={handler}>Load more</Button>
}

export default LoadMoreBtn
