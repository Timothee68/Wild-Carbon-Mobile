import Article from "./ArticleType";
import Expense from "./ExpenseType";

type User = {
    id: string;
    pseudo: string;
    email: string;
    password: string;
    articles: Article[]; 
    users: User[];
    expenses: Expense[]; 
  };

  export default User;