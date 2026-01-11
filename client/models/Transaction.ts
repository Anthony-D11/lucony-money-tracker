import { Realm } from '@realm/react'

export type TransactionType = "expense" | "earning" | "investment";
export type InvestmentAction = "buy" | "sell";
export type TransactionFrequency = "never" | "day" | "month" | "year";

export class Transaction extends Realm.Object<Transaction> {
  _id!: Realm.BSON.ObjectId;
  type!: TransactionType;
  amount!: Realm.BSON.Decimal128;
  currency!: string;
  categoryId!: string;
  createdAt!: Date;
  frequency!: string;
  interval?: number;
  endDate?: Date;
  note!: string;
  action?: InvestmentAction;
  amountAssets?: Realm.BSON.Decimal128;
  unitAssets?: string;

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
      frequency: 'string',
      interval: 'int?',
      endDate: 'date?',
      note: 'string',
      action: 'string?',
      amountAssets: 'decimal128?',
      unitAssets: 'string?'

    },
  };

  static generate(
    typeIn: string, 
    amountIn: string,
    currencyIn: string, 
    categoryIdIn: Realm.BSON.ObjectId, 
    createdAtIn: Date,
    frequencyIn: string,
    intervalIn: number | null,
    endDateIn: Date | null, 
    noteIn: string,
    actionIn: string | null = null,
    amountAssetsIn: string,
    unitAssetsIn: string | null = null
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      type: typeIn,
      amount: new Realm.BSON.Decimal128(amountIn), 
      currency: currencyIn, 
      categoryId: categoryIdIn, 
      createdAt: createdAtIn, 
      frequency: frequencyIn,
      interval: intervalIn,
      endDate: endDateIn,
      note: noteIn,
      action: actionIn,
      amountAssets: new Realm.BSON.Decimal128(amountAssetsIn),
      unitAssets: unitAssetsIn
    };
  }
}