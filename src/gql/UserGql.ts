import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($pseudo: String!, $email: String!, $password: String!) {
    createUser(pseudo: $pseudo, email: $email, password: $password) {
      id
      pseudo
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: String!, $pseudo: String!, $email: String!, $password: String!) {
    updateUser(userId: $userId, pseudo: $pseudo, email: $email, password: $password) {
      id
      pseudo
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

export const GET_USER = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      id
      pseudo
      email
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      pseudo
      email
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
