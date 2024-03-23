'use client'

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
	const router = useRouter()
	return (
		<Pagination
			defaultCurrent={1}
			total={total}
			pageSize={limit}
			current={page}
			hideOnSinglePage
			onChange={(page, pageSize) => {
				setPage(page)
				// router.push(`?_limit=${pageSize}&page=${page}`)
			}}
		/>
	)
}

export default Paggination
