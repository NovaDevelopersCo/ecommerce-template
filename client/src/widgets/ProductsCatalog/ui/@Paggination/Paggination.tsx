'use client'

import { FC } from 'react'

import { Pagination } from 'antd'
import { useRouter } from 'next/navigation'

type TPagginationProps = {
	page: number
	limit: number
	total: number
}

const Paggination: FC<TPagginationProps> = ({ page = 1, limit, total }) => {
	const router = useRouter()
	return (
		<Pagination
			defaultCurrent={1}
			total={total}
			pageSize={limit}
			current={page}
			hideOnSinglePage
			onChange={(page, pageSize) => {
				router.push(`?_limit=${pageSize}&page=${page}`)
			}}
		/>
	)
}

export default Paggination
