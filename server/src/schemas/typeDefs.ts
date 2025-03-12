import { gql } from 'graphql-tag';

const typeDefs = gql`
    # User type represents registered users
    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
    }

    # Book type represents books retrieved & saved
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    # Authentication type for login/signup responses
    type Auth {
        token: ID!
        user: User
    }

    # Input type for adding a new user
    input UserInput {
        username: String!
        email: String!
        password: String!
    }

    # Input type for saving a book
    input BookInput {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }
    
    # Query type for retrieving user data
    type Query {
        me: User
    }

    # Mutation type for login, signup, saving & removing books
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }
`;

export default typeDefs;
