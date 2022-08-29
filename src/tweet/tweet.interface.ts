export interface Tweet {
  text: string;
  image?: string;
  authorId: number;
  commentAllowed: TCommentAllowed;
}

export type TCommentAllowed = 'everyone' | 'followed' | 'noone';
