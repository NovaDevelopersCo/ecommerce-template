import { TypeReplaceEnum } from '@/core/enums';
import { IsEnum, IsOptional } from 'class-validator';

export class UploadAlbumDto {
  @IsOptional()
  @IsEnum(TypeReplaceEnum)
  type: TypeReplaceEnum = TypeReplaceEnum.ALL;
}
