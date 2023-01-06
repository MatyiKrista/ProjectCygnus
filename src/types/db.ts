export type User = {
  createdAt: Date;
  email: string;
  name: string | null;
  photoUrl: string | null;
  updatedAt: Date;
  friends: string[];
};
