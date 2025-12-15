import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from "@/theme-config";
import SelectCategoryModal from '@/components/SelectCategoryModal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TransactionFrequencyModal from '@/components/TransactionFrequencyModal';
import { Category, Transaction } from '@/models';
import { useRealm } from '@/contexts/RealmContext';

const AddTransaction = () => {
  const realm = useRealm();
  const tabBarHeight = useBottomTabBarHeight();
  const [transactionType, setTransactionType] = useState("expense");
  const [transactionAmount, setTransactionAmount] = useState<string>("0");
  const [transactionCurrency, setTransactionCurrency] = useState("USD");
  const [transactionNote, setTransactionNote] = useState("");
  const [transactionInvestmentAction, setTransactionInvestmentAction] = useState<string | null>(null);
  const [transactionInvestmentPrice, setTransactionInvestmentPrice] = useState<number | null>(null);
  const [transactionInvestmentExchangeRate, setTransactionInvestmentExchangeRate] = useState<string | null>(null);

  const [selectCategoryModalVisible, setSelectCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [transactionFrequencyModalVisible, setTransactionFrequencyModalVisible] = useState(false);
  
  const [transactionFrequency, setTransactionFrequency] = useState<string>("never");
  const [transactionFrequencyNumber, setTransactionFrequencyNumber] = useState<number | null>(1);

  const [dateTimePickerModalVisible, setDateTimePickerModalVisible] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());

  const saveTransaction = () => {
    realm.write(() => {
      realm.create("Transaction", Transaction.generate(
        transactionType,
        transactionAmount,
        transactionCurrency,
        selectedCategory!._id,
        transactionDate,
        transactionNote,
        transactionInvestmentAction,
        transactionInvestmentPrice,
        transactionInvestmentExchangeRate
      ));
    })
  }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}
        className="flex flex-1 min-h-screen bg-background-primary"
        contentContainerStyle={{
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 10,
          paddingTop: 10,
          paddingBottom: tabBarHeight + 50,
        }}
      >
        <View className="flex flex-col justify-center items-center gap-3 p-4 w-full bg-background-secondary rounded-xl">
          <View className="flex flex-row gap-2 justify-center items-center p-1 w-full h-10 rounded-xl bg-background-primary">
            <Pressable className={`flex-grow justify-center items-center h-full ${transactionType === "expense" ? "bg-background-secondary": ""} rounded-xl`}
              onPress={() => setTransactionType("expense")}  
            > 
              <Text className="text-text-primary">Expense</Text>
            </Pressable>
            <Pressable className={`flex-grow justify-center items-center h-full ${transactionType === "earning" ? "bg-background-secondary": ""} rounded-xl`}
              onPress={() => setTransactionType("earning")}
            > 
              <Text className="text-text-primary">Earning</Text>
            </Pressable>
            <Pressable className={`flex-grow justify-center items-center h-full ${transactionType === "investment" ? "bg-background-secondary": ""} rounded-xl`}
              onPress={() => setTransactionType("investment")}
            > 
              <Text className="text-text-primary">Investment</Text>
            </Pressable>
          </View>
          <TextInput
            className="w-full h-[80px] leading-[65px] text-6xl text-center font-bold text-text-primary"
            keyboardType="numeric"
            placeholder="$0.00"
            placeholderTextColor={colors.text.secondary}
            value={transactionAmount}
            onChangeText={(text) => setTransactionAmount(text)}
          />
          <View className=" w-full border-hairline border-border"></View>
          <TextInput
            className="justify-start w-full h-[170px] leading-[20px] text-xl font-base text-text-primary"
            keyboardType="default"
            placeholder="Note (optional)"
            placeholderTextColor={colors.text.third}
            multiline={true}
            numberOfLines={7}
            value={transactionNote}
            onChangeText={(text) => setTransactionNote(text)}
            style={{textAlignVertical: "top"}}
          />
          <View className=" w-full border-hairline border-border"></View>
          <View className="flex flex-row gap-4 w-full">
            <Pressable className="p-3 rounded-xl bg-background-primary" onPress={() => setDateTimePickerModalVisible(true)}>
              <Text className="text-xl text-text-primary">{transactionDate.toDateString()}</Text>
            </Pressable>
            {dateTimePickerModalVisible && <DateTimePicker
              value={transactionDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => {setTransactionDate(date || transactionDate); setDateTimePickerModalVisible(false)}}
            />}
            <Pressable className="flex flex-row justify-center items-center p-3 ms-auto rounded-xl bg-background-primary"
              onPress={() => setTransactionFrequencyModalVisible(true)}
            >
                <Text className="text-xl text-text-secondary">{transactionFrequency === "never" ? "Never repeat" : "Every " + (transactionFrequencyNumber! > 1 ? transactionFrequencyNumber!.toString() : "") + " " + (transactionFrequency) + (transactionFrequencyNumber! > 1 ? 's' : "")}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
            </Pressable>
          </View>
          <View className=" w-full border-hairline border-border"></View>
          <Pressable className="flex flex-row items-center w-full p-3 rounded-xl bg-background-primary" onPress={() => setSelectCategoryModalVisible(true)}>
            <Text className="text-xl text-text-secondary">{selectedCategory === null ? "Select category" : selectedCategory.name}</Text>
            <MaterialCommunityIcons className="ms-auto" name="chevron-right" size={24} color={colors.text.secondary} />
          </Pressable>
        </View>
        <Pressable className="justify-center items-center p-4 w-full rounded-xl bg-brand-blue"
          onPress={() => saveTransaction()}
        >
          <Text className="text-xl font-bold text-text-primary">Save transaction</Text>
        </Pressable>
      </ScrollView>
      <SelectCategoryModal 
        transactionTypeIn={"expense"}
        setSelectedCategory={setSelectedCategory}
        selectCategoryModalVisible={selectCategoryModalVisible}
        setSelectCategoryModalVisible={setSelectCategoryModalVisible}
      />
      <TransactionFrequencyModal
        transactionTypeIn={"expense"}
        transactionFrequency={transactionFrequency}
        setTransactionFrequency={setTransactionFrequency}
        transactionFrequencyNumber={transactionFrequencyNumber} 
        setTransactionFrequencyNumber={setTransactionFrequencyNumber}
        transactionFrequencyModalVisible={transactionFrequencyModalVisible}
        setTransactionFrequencyModalVisible={setTransactionFrequencyModalVisible}
      />
    </SafeAreaView>
  )
}

export default AddTransaction