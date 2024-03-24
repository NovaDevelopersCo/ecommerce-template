interface IProduct {
	_id: string
	name: string
	tags: string[]
	stock: number
	description: string
	price: number
	image: string
	createdAt: string
	updatedAt: string
	slug: string
}

export default IProduct
