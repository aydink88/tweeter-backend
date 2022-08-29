import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MinLength(3)
  readonly text: string;

  @IsOptional()
  image: string;
}
