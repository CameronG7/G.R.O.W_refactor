const { gql } = require('@apollo/client');

export const QUERY_USER = gql`
  query currentUser {
  me {
    username
    email
    bookCount
    savedBooks {
      authors
      bookId
      description
      title
      image
    }
   
  }
}
`;
