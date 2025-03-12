import { User } from '../models/index.js';
import { signToken } from '../services/auth.js';
import { AuthenticationError } from 'graphql';

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    bookCount?: number;
    savedBooks: Book[];
}

interface Book {
    bookId: string;
    authors: string[];
    description: string;
    title: string;
    image?: string;
    link?: string;
}

interface SaveBookArgs {
    bookData: Book;
}

interface RemoveBookArgs {
    bookId: string;
}

interface Context {
    user?: User;
}

const resolvers = {
    Query: {
        // Get logged-in user data
        me: async (_parent: unknown, _args: unknown, context: Context): Promise<User | null> => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }
            return await User.findOne({ _id: context.user._id }).populate('savedBooks') as User | null;
        }
    },

    Mutation: {
        // Login user and return auth token
        login: async (_parent: unknown, { email, password }: { email: string, password: string }): Promise<{ token: string, user: User }> => {
            const user = await User.findOne({ $or: [{ username: email }, { email }] });

            if (!user) {
                throw new AuthenticationError(`User not found`);
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user: user.toObject() as User };
        },

        // Register new user
        addUser: async (_parent: unknown, { username, email, password }: { username: string, email: string, password: string }): Promise<{ token: string, user: User }> => {
            const user = await User.create({ username, email, password });
            const token = signToken(user.username, user.email, user._id);
            return { token, user: user.toObject() as User };
        },

        // Save book to user's savedBooks list
        saveBook: async (_parent: unknown, { bookData }: SaveBookArgs, context: Context): Promise<User | null> => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }

            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
            ).populate('savedBooks');
        },

        // Remove book from savedBooks
        removeBook: async (_parent: unknown, { bookId }: RemoveBookArgs, context: Context): Promise<User | null> => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in!');
            }

            return await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            ).populate('savedBooks');
        }
    }
};

export default resolvers;
