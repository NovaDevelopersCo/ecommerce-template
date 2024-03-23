import ICreateCharacteristicDto from './create-characteristic.dto'
import ICreateOptionDto from './create-option.dto'

interface ICreateProductDto {
	name: string
	description: string
	price: number
	image: string
	stock: number
	manufacturer?: string
	tags?: string[]
	categories?: string[]
	characteristics?: ICreateCharacteristicDto[]
	options?: ICreateOptionDto[]
}

export default ICreateProductDto
