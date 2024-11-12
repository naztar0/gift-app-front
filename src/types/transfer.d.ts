interface ITransfer extends ITimestamps {
  _id: ObjectId;
  transaction: ITransaction;
  recipient: ObjectId;
}
