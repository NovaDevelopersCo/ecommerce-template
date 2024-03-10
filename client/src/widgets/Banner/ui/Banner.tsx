'use client'

import React from 'react'

import { Carousel } from 'antd'

const contentStyle: React.CSSProperties = {
	height: '30svh',
	color: '#fff',
	textAlign: 'center',
	background: '#364d79',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}

const Banner = () => {
	const onChange = (currentSlide: number) => {
		console.log(currentSlide)
	}
	return (
		<Carousel afterChange={onChange} autoplay>
			<div>
				<h3 style={contentStyle}>1</h3>
			</div>
			<div>
				<h3 style={contentStyle}>2</h3>
			</div>
			<div>
				<h3 style={contentStyle}>3</h3>
			</div>
			<div>
				<h3 style={contentStyle}>4</h3>
			</div>
		</Carousel>
	)
}

export default Banner
