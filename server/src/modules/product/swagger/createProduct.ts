import { ApiProperty } from '@nestjs/swagger';

class CharacteristicProduct {
  @ApiProperty()
  characteristicId: string;
  @ApiProperty()
  value: string;
}

class OptionsProduct {
  @ApiProperty()
  optionId: string;
  @ApiProperty()
  optionValue: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  pricePrefix: string;
}

export class CreateProduct {
  @ApiProperty()
  name: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  stock: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  image: string;

  @ApiProperty({ isArray: true, type: CharacteristicProduct })
  characteristics: CharacteristicProduct[];

  @ApiProperty({ isArray: true, type: OptionsProduct })
  options: OptionsProduct[];

  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  // ! Можно не указывать :)
  @ApiProperty()
  __v: number;

  @ApiProperty()
  slug: string;
}
