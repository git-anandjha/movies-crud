import { Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  token?: string;
}

export default IUser;
