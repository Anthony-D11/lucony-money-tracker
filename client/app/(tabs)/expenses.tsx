import { View, Text, ScrollView, TextInput, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { colors } from "@/theme-config";
import { Transaction } from '@/models';
import { useQuery } from '@/contexts/RealmContext';
import TransactionCard from '@/components/TransactionCard';
import TransactionHeader from '@/components/TransactionHeader';

const Expenses = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [searchText, setSearchText] = useState("");
  const transactionList = useQuery(Transaction);
  const expenseList: Array<Transaction> = transactionList.filtered("type == 'expense'");
  
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <FlatList
          data={expenseList}
          keyExtractor={(item) =>item._id.toString()}
          ListHeaderComponent={<TransactionHeader title="Expenses" searchText={searchText} setSearchText={setSearchText}/>}
          renderItem={({item}) => (
            <TransactionCard 
              type={item.type} 
              amount={item.amount} 
              currency={item.currency} 
              categoryId={item.categoryId}
              createdAt={item.createdAt} 
              note={item.note}
            />
          )}
          ListEmptyComponent={
            <Text >No expenses found.</Text>
          }
          ListHeaderComponentStyle={{
            marginBottom: 30
          }}
          contentContainerStyle={{
            display: "flex",
            gap: 10,
            flexGrow: 1,
            paddingTop: 10,
            paddingInline: 10,
            paddingBottom: tabBarHeight + 50,
            backgroundColor: colors.background.primary
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Expenses