import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':id/like')
  @UseGuards(AuthGuard)
  likeComment(@Param('id') commentId: number, @User() user: UserEntity) {
    return this.commentService.likeComment(commentId, user);
  }

  @Delete(':id/like')
  @UseGuards(AuthGuard)
  unlikeComment(@Param('id') commentId: number, @User('id') userId: number) {
    return this.commentService.unlikeComment(commentId, userId);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async commentOnTweet(
    @Body() comment: CreateCommentDto,
    @Param('id') tweetId: number,
    @User('id') userId: number,
  ) {
    const newComment = await this.commentService.addComment({
      ...comment,
      tweetId,
      authorId: userId,
    });

    return newComment;
  }
}
