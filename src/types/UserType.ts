import Article from "./ArticleType";
import Expense from "./ExpenseType";

export type User = {
  
    id: string;
    pseudo: string;
    email: string;
    password: string;
    articles: Article[]; 
    users: User[];
    expenses: Expense[]; 
};

export type UserProfile = {
  getUser: {
    id: string;
    pseudo: string;
    email: string;
  }
};
