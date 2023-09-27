import { gql } from '@apollo/client';

export const CREATE_ARTICLE = gql`
mutation CreateArticle(
  $title: String!
  $description: String!
  $url: String!
  $userId: String!
) {
  createArticle(
    title: $title
    description: $description
    url: $url
    userId: $userId
  ) {
    id
    title
    description
    url
    createdAt
    updatedAt
  }
}
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle(
    $title: String!
    $description: String!
    $url: String!
    $articleId: String!
    $userId: String!
  ) {
    updateArticle(
      title: $title
      description: $description
      url: $url
      articleId: $articleId
      userId: $userId
    ) {
      id
      title
      description
      url
      createdAt
      updatedAt
      user {
        id
        pseudo
        email
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: String!) {
    deleteArticle(id: $id)
  }
`;

export const GET_ARTICLE = gql`
  query GetArticle($articleId: String!) {
    getArticle(articleId: $articleId) {
      id
      title
      description
      url
      createdAt
      updatedAt
      user {
        id
        pseudo
        email
      }
    }
  }
`;

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    getAllArticle {
      id
      title
      description
      url
      createdAt
    }
  }
`;
