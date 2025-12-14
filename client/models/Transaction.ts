import { Realm } from '@realm/react'

export class Transaction extends Realm.Object<Transaction> {
  _id!: Realm.BSON.ObjectId;
  amount!: Realm.BSON.Decimal128;
  currency!: string;
  category!: string;
  createdAt!: Date;
  note!: string;

  static schema = {
    name: 'Transaction',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      amount: 'decimal128',
      currency: 'string',
      category: 'string',
      createdAt: 'date',
      note: 'string'
    },
  };

  static generate(amountString: string, category: string) {
    return {
      _id: new Realm.BSON.ObjectId(),
      amount: Realm.BSON.Decimal128.fromString(amountString), 
      category,
      createdAt: new Date(),
    };
  }
}