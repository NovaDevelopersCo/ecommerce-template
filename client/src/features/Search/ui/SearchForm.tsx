import React, { useState } from 'react'

import { AutoComplete } from 'antd'

const SearchForm = () => {
	const [search, setSearch] = useState<string>()
	const [options, setOptions] = useState<DefaultOptionType[]>([])

	const handleSearch = (value: string) => {
		setOptions(() => {
			if (!value || value.includes('@')) {
				return []
			}
			return ['gmail.com', '163.com', 'qq.com'].map<DefaultOptionType>(
				domain => ({
					label: `${value}@${domain}`,
					value: `${value}@${domain}`
				})
			)
		})
	}

	return (
		<form action={''} className='flex flex-row items-center'>
			<AutoComplete
				style={{
					width: '170px'
				}}
				options={options}
				onSearch={handleSearch}
				onChange={e => setSearch(e.target?.value)}
				value={search}
				placeholder='Find something here ...'
				filterOption={(inputValue, option) =>
					option!.value
						.toUpperCase()
						.indexOf(inputValue.toUpperCase()) !== -1
				}
			/>
		</form>
	)
}

export default SearchForm
