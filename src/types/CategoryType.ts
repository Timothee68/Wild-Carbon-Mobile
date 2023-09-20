import Item from "./ItemType";

type Category = {
    id: string;
    name: string;
    items: Item[]; 
  };

export default Category;