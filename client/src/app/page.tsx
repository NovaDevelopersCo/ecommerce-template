import { v4 as uuid } from 'uuid'

import { BannerAntd } from '@entities/Carousel'

export default function Home() {
	return (
		<main>
			<BannerAntd
				slides={[
					<h1 className='text-white p-4' key={uuid()}>
						Slide 1
					</h1>,
					<h1 className='text-white p-4' key={uuid()}>
						Slide 2
					</h1>,
					<h1 className='text-white p-4' key={uuid()}>
						Slide 3
					</h1>
				]}
			/>
		</main>
	)
}
