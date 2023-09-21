import User from './UserType';

type Article = {
    id: string;
    title: string;
    description: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
  };

export default Article;