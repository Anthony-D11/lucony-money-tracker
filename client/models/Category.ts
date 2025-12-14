import { Realm } from '@realm/react'

export class Category extends Realm.Object<Category> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  type!: string;
  color!: string;
  icon!: string;
  default!: boolean;

  static schema: Realm.ObjectSchema = {
    name: 'Category',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      type: 'string',
      color: 'string',
      icon: 'string',
      default: {type: 'bool', default: false}
    },
  };

  static generate(categoryName: string, categoryType: string, categoryColor: string, categoryIcon: string, isDefault: boolean = false) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name: categoryName, 
      type: categoryType,
      color: categoryColor,
      icon: categoryIcon,
      default: isDefault
    };
  }
}