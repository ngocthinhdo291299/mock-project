export interface settingsInputDataType {
  username: string | undefined;
  image: string | undefined;
  bio: string | undefined;
  password: string | undefined;
  email: string | undefined;
}

export interface inputCreateArticleType {
  title: string;
  description: string;
  body: string;
  taglist: string[];
}

export interface requestBodyCreateArticleType {
  article: {
    title: string;
    description: string;
    body: string;
    taglist: string[];
  };
}
