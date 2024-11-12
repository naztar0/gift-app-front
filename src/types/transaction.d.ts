type TransactionStatusType = 'pending' | 'completed' | 'expired';

interface ITransaction extends ITimestamps {
  _id: ObjectId;
  user: IUser;
  gift: IGift;
  price: number;
  currency: CurrencyType;
  availability: number;
  status: TransactionStatusType;
}
