import UnitEnum from "../enums/UnitEnum";
import Category from "./CategoryType";
import Expense from "./ExpenseType";

type Item = {
    id: string;
    label: string;
    emissionFactor: number;
    unit: UnitEnum; 
    createdAt: Date;
    updatedAt: Date;
    category: Category; 
    expenses: Expense[]; 
  };

  export default Item;
  