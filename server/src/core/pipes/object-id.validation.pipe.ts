import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { OBJECT_ID_VALIDATION_PIPE } from './pipe.contants';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type != 'param' && metadata.type != 'query') return value;

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(OBJECT_ID_VALIDATION_PIPE);
    }
    return value;
  }
}
