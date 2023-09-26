import { gql } from '@apollo/client';

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($itemId: String!, $title: String!, $quantity: Float!) {
    createExpense(itemId: $itemId, title: $title, quantity: $quantity)
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation UpdateExpense($id: String!, $itemId: String!, $title: String!, $quantity: Float!) {
    updateExpense(id: $id, itemId: $itemId, title: $title, quantity: $quantity) {
      id
      title
      quantity
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($expenseId: String!) {
    deleteExpense(expenseId: $expenseId)
  }
`;

export const GET_EXPENSE = gql`
  query GetExpense($expenseId: String!) {
    getExpense(expenseId: $expenseId) {
      id
      title
      quantity
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_EXPENSES = gql`
  query GetAllExpenses {
    getAllExpenses {
      id
      title
      quantity
      createdAt
      updatedAt
    }
  }
`;
