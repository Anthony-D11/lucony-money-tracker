import { Realm } from '@realm/react'

export class Currency extends Realm.Object<Currency> {
  _id!: Realm.BSON.ObjectId;
  fullName!: string;
  shortName!: string;

  static schema = {
    name: 'Currency',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      fullName: 'string',
      shortName: 'string'
    },
  };

  static generate(
    fullNameIn: string, 
    shortNameIn: string
  ) {
    return {
      _id: new Realm.BSON.ObjectId(),
      fullName: fullNameIn,
      shortName: shortNameIn
    };
  }
}