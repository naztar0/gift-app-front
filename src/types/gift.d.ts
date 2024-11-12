interface IAnimationSequence {
  direction: 1 | -1;
}

interface IGift extends ITimestamps {
  _id: ObjectId;
  name: string;
  previewUrl: string;
  animationUrl: string;
  animationSequence: IAnimationSequence[];
  color: string;
  quantity: number;
  price: number;
  currency: CurrencyType;
  sold: number;
}

interface IGiftBuy {
  url: string;
}

type IGiftActivity = {
  _id: ObjectId;
  gift: string;
} & ({
  type: 'transaction';
  user: IUser;
  recipient: null;
} | {
  type: 'transfer';
  sender: IUser;
  recipient: IUser;
}) & ITimestamps;
