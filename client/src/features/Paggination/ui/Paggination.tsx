import { Dispatch, FC, SetStateAction } from 'react'

import { Pagination } from 'antd'
import { useRouter } from 'next/navigation'

type TPagginationProps = {
	page: number
	limit: number
	total: number
	setPage: Dispatch<SetStateAction<number>>
}

const Paggination: FC<TPagginationProps> = ({
	page = 1,
	limit,
	total,
	setPage
}) => {
	return (
		<Pagination
			defaultCurrent={1}
			total={total}
			pageSize={limit}
			current={page}
			hideOnSinglePage
			onChange={(page, pageSize) => {
				setPage(page)
			}}
		/>
	)
}

export default Paggination
