import type { Request, Response } from 'express';
// Import User model
import User from '../models/User.js';
// Import signToken function from auth
import { signToken } from '../services/auth.js';

// Define User interface to ensure _id is always a string and includes isCorrectPassword()
interface UserDocument {
  _id: string;
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

export const getSingleUser = async (req: Request, res: Response) => {
  const foundUser = await User.findOne({
    $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
  });

  if (!foundUser) {
    return res.status(400).json({ message: 'Cannot find a user with this ID!' });
  }

  return res.json(foundUser);
};

export const createUser = async (req: Request, res: Response) => {
  const user = (await User.create(req.body)) as UserDocument;

  if (!user) {
    return res.status(400).json({ message: 'Something went wrong!' });
  }

  const token = signToken(user.username, user.email, String(user._id));
  return res.json({ token, user });
};

export const login = async (req: Request, res: Response) => {
  const user = (await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })) as UserDocument | null;

  if (!user) {
    return res.status(400).json({ message: "Can't find this user" });
  }

  const correctPw = await user.isCorrectPassword(req.body.password);
  if (!correctPw) {
    return res.status(400).json({ message: 'Wrong password!' });
  }

  const token = signToken(user.username, user.email, String(user._id));
  return res.json({ token, user });
};

export const saveBook = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { savedBooks: req.body } },
      { new: true, runValidators: true }
    );
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { savedBooks: { bookId: req.params.bookId } } },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "Couldn't find user with this ID!" });
  }

  return res.json(updatedUser);
};


