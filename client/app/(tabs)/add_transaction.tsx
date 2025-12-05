import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from "@/theme-config";
import SelectCategoryModal from '@/components/SelectCategoryModal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TransactionFrequencyModal from '@/components/TransactionFrequencyModal';

const AddTransaction = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const [transactionType, setTransactionType] = useState("expense");
  const [selectCategoryModalVisible, setSelectCategoryModalVisible] = useState(false);
  const [transactionFrequencyModalVisible, setTransactionFrequencyModalVisible] = useState(false);
  const [transactionDate, setTransactionDate] = useState(new Date());
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
        <View className="flex flex-col justify-center items-center gap-3 p-4 w-full h-full bg-background-secondary rounded-xl border ">
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
            className="w-full h-20 leading-[65px] text-6xl text-center font-bold text-text-primary"
            keyboardType="numeric"
            placeholder="$0.00"
            placeholderTextColor={colors.text.secondary}
            textContentType="none"
          />
          <View className=" w-full border-hairline border-border"></View>
          <TextInput
            className="w-full h-10 leading-[20px] text-xl font-base text-text-primary"
            keyboardType="default"
            placeholder="Note (optional)"
            placeholderTextColor={colors.text.third}
            textContentType="none"
          />
          <View className=" w-full border-hairline border-border"></View>
          <View className="flex flex-row gap-4 w-full">
            <DateTimePicker
              value={transactionDate}
              mode="date"
              display="compact"
              onChange={(event, date) => {console.log(event); setTransactionDate(date || transactionDate)}}
            />
            <Pressable className="flex-1 flex flex-row items-center ms-auto"
              onPress={() => setTransactionFrequencyModalVisible(true)}
            >
                <Text className="text-xl text-text-secondary">Never repeat</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
            </Pressable>
          </View>
          <View className=" w-full border-hairline border-border"></View>
          <Pressable onPress={() => setSelectCategoryModalVisible(true)}>
            <Text className="text-xl text-text-secondary">Select category  > </Text>
          </Pressable>
        </View >
      </ScrollView>
      <SelectCategoryModal 
        transactionTypeIn={"expense"} 
        selectCategoryModalVisible={selectCategoryModalVisible}
        setSelectCategoryModalVisible={setSelectCategoryModalVisible}
      />
      <TransactionFrequencyModal
        transactionTypeIn={"expense"} 
        transactionFrequencyModalVisible={transactionFrequencyModalVisible}
        setTransactionFrequencyModalVisible={setTransactionFrequencyModalVisible}
      />
    </SafeAreaView>
  )
}

export default AddTransaction