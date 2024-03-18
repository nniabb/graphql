export const typeDefs = `#graphql
type User {
    id: ID
    name: String
    age: Int
    isAdmin: Boolean
    expenses: [Expense!]!
}

type Expense {
    id: ID
    title: String
    cost: Int
    user: User! 
}

type Query{
    users: [User!]!
    user(id: ID!) : User
    expenses: [Expense!]!
}

type Mutation {
    createUser(name: String!, age: Int!, isAdmin: Boolean!): User!
    updateUser(id: ID!, name: String, age: Int, isAdmin: Boolean): User!
    deleteUser(id: ID!): User
    createExpense(title: String!, cost: Int!, user_id: ID!): Expense!
    updateExpense(id: ID!, title: String, cost: Int): Expense!
    deleteExpense(id: ID!): Expense
}
`