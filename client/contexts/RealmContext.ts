import { createRealmContext } from "@realm/react";
import { Category, Transaction } from "@/models";

export const {RealmProvider, useRealm, useQuery, useObject} = createRealmContext({
  schema: [Transaction, Category],
})