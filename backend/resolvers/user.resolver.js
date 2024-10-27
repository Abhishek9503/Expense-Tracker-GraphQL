import { Query } from "mongoose";
import { users } from "../dummyData/data.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      console.log(input);
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          return new Error("Please provide all the required fields");
        }
        const existingUser = await User.findOne({ username });

        if (existingUser) {
          return new Error("User with this username already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePix = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePix = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePix : girlProfilePix,
        });

        const user = await newUser.save();
        console.log("This is new user", user);
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.log(error);
        console.log("Error in signup", error);
        return error;
      }
    },

    login: async (_, { input }, context) => {
      try {
        const { username, paasword } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);

        return user;
      } catch (err) {
        console.log("Error in login", err);
        throw new Error(err.message || "Internal server eroor ");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        req.session.destroy((err) => {
          if (err) throw err;
        });
        res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (error) {
        console.log("Error in logout", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (error) {
        console.log("Error in authUser", error);
        throw new Error(error.message || "Internal server error");
      }
    },

    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        console.log("Error in user", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },

  // Todo : ADD USER / TRANSACTION REALTION
};

export default userResolver;
