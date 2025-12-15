import { Realm } from '@realm/react'

export class Transaction extends Realm.Object<Transaction> {
  _id!: Realm.BSON.ObjectId;
  type!: "expense" | "earning" | "investment";
  amount!: Realm.BSON.Decimal128;
  currency!: string;
  categoryId!: string;
  createdAt!: Date;
  note!: string;
  action?: "buy" | "sell";
  price?: number;
  exchangeRate?: string;

  static schema = {
    name: 'Transaction',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      type: 'string',
      amount: 'decimal128',
      currency: 'string',
      categoryId: 'objectId',
      createdAt: 'date',
      note: 'string',
      action: 'string?',
      price: 'decimal128?',
      exchangeRate: 'string?'

    },
  };

  static generate(
    typeIn: string, 
    amountIn: string,
    currencyIn: string, 
    categoryIdIn: Realm.BSON.ObjectId, 
    createdAtIn: Date, 
    noteIn: string,
    actionIn: string | null = null,
    priceIn: number | null = null,
    exchangeRateIn: string | null = null
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      type: typeIn,
      amount: new Realm.BSON.Decimal128(amountIn), 
      currency: currencyIn, 
      categoryId: categoryIdIn, 
      createdAt: createdAtIn, 
      note: noteIn,
      action: actionIn,
      price: priceIn,
      exchangeRate: exchangeRateIn
    };
  }
}