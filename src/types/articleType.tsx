export interface authorType {
  username: string;

  bio: null;

  image: string;

  following: boolean;
}

export interface articleType {
  slug: string;

  title: string;

  description: string;

  body: string;

  tagList: string[];

  createdAt: string;

  updatedAt: string;

  favorited: boolean;

  favoritesCount: number;

  author: authorType;
}

export interface commentType {
  id: number;

  createdAt: string;

  updatedAt: string;

  body: string;

  author: authorType;
}
