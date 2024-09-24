import { PartialType } from '@nestjs/mapped-types';
import { CreateCiclopaseoDto } from './create-ciclopaseo.dto';

export class UpdateCiclopaseoDto extends PartialType(CreateCiclopaseoDto) {}
