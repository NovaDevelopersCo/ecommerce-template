import { Button } from 'antd';
import { SetStateAction, Dispatch } from 'react';

const LoadMoreBtn = ({setList, queryWithOutExtra}: {setList: Dispatch<SetStateAction<unknown[]>>, queryWithOutExtra: unknown}) => {
	const handler = () => {
		const {data} = queryWithOutExtra()
		setList(prev=> [...prev, data.items])
	}

	return (<Button onClick={handler}>Load more</Button>)
}

export default LoadMoreBtn