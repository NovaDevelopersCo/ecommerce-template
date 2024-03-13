import { FC } from 'react'

import { Pagination } from 'antd'

type TPagginationProps = {
	page: number
	limit: number
	total: number
}

const Paggination: FC<TPagginationProps> = ({
	page = 1,
	limit = 12,
	total
}) => {
	return <Pagination defaultCurrent={1} total={total} pageSize={limit} />
}

export default Paggination
