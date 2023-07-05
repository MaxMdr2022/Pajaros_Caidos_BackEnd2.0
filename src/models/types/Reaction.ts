export type Reaction = {
  id?: string
  reaction: Reactions
  createdAt?: Date
  updatedAt?: Date
}

export enum Reactions {
  Like = 'like',
  Love = 'love',
  Laugh = 'laugh',
  Sad = 'sad',
  Applause = 'applause',
  Angry = 'angry',
  Free = 'free',
}
