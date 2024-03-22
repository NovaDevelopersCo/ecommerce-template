'use client'

import { FC, ReactNode } from 'react'

import { Carousel } from 'antd'

type TBannerProps = {
	slides: ReactNode[]
}

const Banner: FC<TBannerProps> = ({ slides }) => {
	return (
		<Carousel autoplay>
			{slides.map((slide, idx) => (
				<div key={idx}>{slide}</div>
			))}
		</Carousel>
	)
}

export default Banner
