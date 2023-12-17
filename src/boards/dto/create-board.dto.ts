import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Priority } from '../type/types';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Priority)
  priority: Priority;
}
