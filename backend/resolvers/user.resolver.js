import { Query } from "mongoose";

const userResolver = {
    Query: {
        users:() => {
            return  users
        },
        
    },

    Mutation:{

    }
}


export default userResolver;