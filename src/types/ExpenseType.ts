import Item from "./ItemType";
import User from "./UserType";

type Expense = {
    id: string;
    title: string;
    quantity: number;
    emissionTotal: number;
    createdAt: Date;
    updatedAt: Date;
    user: User; 
    item: Item; 
  };
  
export default Expense;