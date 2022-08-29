import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { TCommentAllowed } from '../tweet.interface';

export class CreateTweetDto {
  @IsNotEmpty()
  @MinLength(3)
  readonly text: string;

  @IsOptional()
  readonly image: string;

  @IsOptional()
  readonly commentAllowed: TCommentAllowed;

  @IsOptional()
  readonly hashtags: string[];
}
