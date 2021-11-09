import { gql } from "apollo-server";

export default gql`
  type Query {
    findUserId(
      userId: String!
      userName: String!
      phone: String!
    ): findUserPasswordResult!
  }

  type UserPassword {
    password: String!
  }

  type findUserPasswordResult {
    ok: Boolean!
    error: String
    password: UserPassword!
  }
`;
