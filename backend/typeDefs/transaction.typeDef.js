const transactionTypeDef = `
    type Transaction {
        _id: ID!
        user: User!
        description: String!
        paymentType: String!
        category: String!
        amount: Float!
        location: String
        date: String!
    }


    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
    }


    type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
    deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
    }


    input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    date: String
    location: String
    }

`;

export default transactionTypeDef;