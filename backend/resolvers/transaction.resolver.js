import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser) {
          throw new Error("You are not authenticated!");
        }

        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.log("Error in authUser", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.log("Error in gettng Transaction", error);
        throw new Error(error.message || "Error getting transaction");
      }
    },

    // TODO => ADD categoryStatistics query
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.log("Error in creating Transaction", error);
        throw new Error(error.message || "Error creating transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        console.error("Erorrupdating transaction", error);
        throw new Error(error.message || "Error updating transaction");
      }
    },
    deleteTransaction: async (_, {transactionId}) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction", error);
        throw new Error(error.message || "Error deleting transaction");
      } 
    },
  },

  // TODO => ADD TRANSACTION/USER resolver
};

export default transactionResolver;
