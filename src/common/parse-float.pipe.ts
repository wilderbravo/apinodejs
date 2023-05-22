import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseFloatPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseFloat(value);
    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not an number`);
    }
    return val;
  }
}
