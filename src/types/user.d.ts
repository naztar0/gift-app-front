interface IUser extends ITimestamps {
  _id: ObjectId;
  telegramId: number;
  username: string;
  firstName: string;
  lastName: string;
  languageCode: string;
  photoUrl: string;
  isPremium: boolean;
  isBanned: boolean;
  giftCount: number;
  rank: number;
}

interface IUserShort {
  _id: ObjectId;
  telegramId: number;
  rank: number;
  giftCount: number;
  firstName: string;
  lastName: string;
  photoUrl: string;
  isPremium: boolean;
}

type IUserActivity = {
  _id: ObjectId;
  gift: IGift;
  createdAt: string;
} & ({
  type: 'transfer';
  sender: IUser;
  recipient: IUser;
} | {
  type: 'transaction';
  user: null;
  recipient: null;
});
