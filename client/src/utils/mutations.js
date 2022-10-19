import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $bookId: ID!, $authors: [String!], $description: String!, $title: String!, $image: String!) {
    saveBook(userId: $userId, input: {bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image}) {
      _id
      books {
        bookId
        authors
        description
        title
        image
      }
      }
    }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      bookId
      }
    }
`;