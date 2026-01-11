import { View, Text, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import DateTimePicker from '@react-native-community/datetimepicker';
import CurrencyInput from 'react-native-currency-input';
import { colors } from "@/theme-config";
import SelectCategoryModal from '@/components/SelectCategoryModal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TransactionFrequencyModal from '@/components/TransactionFrequencyModal';
import { Category, Transaction, TransactionType, InvestmentAction, TransactionFrequency } from '@/models';
import { useRealm } from '@/contexts/RealmContext';
import { router } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

const AddTransaction = () => {
  const realm = useRealm();
  const tabBarHeight = 80;//useBottomTabBarHeight();
  const [transactionType, setTransactionType] = useState<TransactionType>("expense");
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [transactionCurrency, setTransactionCurrency] = useState<string>("$");
  const [transactionNote, setTransactionNote] = useState<string>("");
  const [transactionInvestmentAction, setTransactionInvestmentAction] = useState<string | null>(null);
  const [transactionInvestmentAmountAssets, setTransactionInvestmentAmountAssets] = useState<number | null>(0);
  const [transactionInvestmentUnitAssets, setTransactionInvestmentUnitAssets] = useState<string | null>("BTC");

  const [selectCategoryModalVisible, setSelectCategoryModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [transactionFrequencyModalVisible, setTransactionFrequencyModalVisible] = useState<boolean>(false);
  
  const [transactionFrequency, setTransactionFrequency] = useState<TransactionFrequency>("never");
  const [transactionFrequencyInterval, setTransactionFrequencyInterval] = useState<number | null>(null);

  const [transactionEndRepeats, setTransactionEndRepeats] = useState(
    [{label: "Never", value: "never"}, {label: "On Date", value: "on_date"}]
  );
  const [transactionEndRepeat, setTransactionEndRepeat] = useState("never");
  const [transactionEndRepeatPickerVisible, setTransactionEndRepeatPickerVisible] = useState(false);  

  const [transactionEndDatePickerModalVisible, setTransactionEndDatePickerModalVisible] = useState<boolean>(false);
  const [transactionEndDate, setTransactionEndDate] = useState<Date | null>(null);

  const [transactionDatePickerModalVisible, setTransactionDatePickerModalVisible] = useState<boolean>(false);
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());

  const handleChangeText = (input: string) => {
    const cleanedInput = input.replace(/[^0-9,.]/g, '');
  }

  const saveTransaction = () => {
    try{
      realm.write(() => {
        realm.create("Transaction", Transaction.generate(
          transactionType,
          transactionAmount.toString(),
          transactionCurrency,
          selectedCategory!._id,
          transactionDate,
          transactionFrequency,
          transactionFrequencyInterval,
          transactionEndDate,
          transactionNote,
          transactionInvestmentAction,
          transactionInvestmentAmountAssets!.toString(),
          transactionInvestmentUnitAssets
        ));
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex flex-1 bg-background-secondary">
        <View className="flex-row items-center gap-4 p-4 bg-background-primary">
          <Pressable onPress={() => router.back()}>
            <MaterialCommunityIcons name="close" size={30} color={colors.text.primary} />
          </Pressable>
          <Text className="text-lg font-bold text-text-primary">Add Transaction</Text>
          <Pressable className="ms-auto" onPress={() => {saveTransaction(); router.back()}}>
            <Text className="text-lg font-bold text-text-link">Save</Text>
          </Pressable>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}
          className="flex flex-grow"
          contentContainerStyle={{
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
            paddingInline: 10,
            paddingTop: 10,
            paddingBottom: tabBarHeight + 50,
          }}
        >
          <View className="flex flex-col justify-center items-center gap-3 p-4 w-full">
            <View className="order-0 flex flex-row gap-2 justify-center items-center p-1 w-full h-10 rounded-xl bg-background-primary">
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
            <View className="flex flex-col justify-center items-center gap-3 p-4 w-full bg-background-primary rounded-xl">
              {transactionType !== "investment" && <>
                <View className="flex flex-row justify-center items-center w-full">
                  <CurrencyInput
                    className="min-w-[50px] h-[80px] leading-[55px] text-6xl font-bold text-text-primary"
                    prefix={transactionCurrency}
                    delimiter=','
                    separator='.'
                    precision={2}
                    minValue={0}
                    keyboardType="decimal-pad"
                    placeholderTextColor={colors.text.secondary}
                    value={transactionAmount}
                    onChangeValue={(value) => setTransactionAmount(value || 0)}
                  />
                </View>
              </>}
              
              {transactionType === "investment" && <>
                <View className="flex flex-row items-center gap-4">
                  <View className="flex-1 flex flex-col gap-3">
                    <Text className="text-sm text-text-third">The amount you paid</Text>
                    <CurrencyInput
                      className="justify-start w-full text-xl font-base text-text-primary"
                      delimiter=','
                      separator='.'
                      precision={2}
                      minValue={0}
                      keyboardType="decimal-pad"
                      placeholderTextColor={colors.text.secondary}
                      value={transactionAmount}
                      onChangeValue={(value) => setTransactionAmount(value || 0)}
                    />
                  </View>
                  <Pressable className="flex flex-row">
                    <Text className="text-xl font-bold">{transactionCurrency}</Text>
                    <MaterialCommunityIcons name="triangle-small-down" size={24} color="black" />
                  </Pressable>
                </View>
              </>}

              <View className=" w-full border-hairline border-border"></View>
              <View className="flex flex-row gap-4 w-full">
                <Pressable 
                  className="p-3 rounded-xl bg-background-secondary" 
                  onPress={() => setTransactionDatePickerModalVisible(true)}
                >
                  <Text className="text-xl text-text-primary">{transactionDate.toDateString()}</Text>
                </Pressable>
                {transactionDatePickerModalVisible && <DateTimePicker
                  value={transactionDate}
                  mode="date"
                  display="spinner"
                  onChange={(event, date) => {setTransactionDate(date || transactionDate); setTransactionDatePickerModalVisible(false)}}
                />}
                <Pressable 
                  className="flex flex-row justify-center items-center p-3 ms-auto"
                  onPress={() => setTransactionFrequencyModalVisible(true)}
                >
                    <Text className="text-xl text-text-secondary">{transactionFrequency === "never" ? "Never repeat" : "Every " + (transactionFrequencyInterval! > 1 ? transactionFrequencyInterval!.toString() : "") + " " + (transactionFrequency) + (transactionFrequencyInterval! > 1 ? 's' : "")}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text.secondary} />
                </Pressable>
              </View>

              {transactionFrequency !== "never" && <>
                <View className=" w-full border-hairline border-border"></View>
                <View className="flex flex-row items-center w-full px-3 rounded-xl bg-background-primary">
                  <Text className="me-auto text-xl text-text-primary">End Repeat</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    open={transactionEndRepeatPickerVisible}
                    value={transactionEndRepeat}
                    items={transactionEndRepeats}
                    setOpen={setTransactionEndRepeatPickerVisible}
                    setValue={setTransactionEndRepeat}
                    setItems={setTransactionEndRepeats}
                    onSelectItem={(item) => {
                      setTransactionEndDate(item.value === "never" ? null : new Date())
                    }}
                    style={{
                      borderWidth: 0,
                      backgroundColor: colors.background.secondary
                    }}
                    containerStyle={{
                      width: 120,
                      marginLeft: "auto"
                    }}
                    textStyle={{
                      fontSize: 17,
                    }}
                  />
                </View>
                {transactionEndRepeat === "on_date" && <>
                  <View className=" w-full border-hairline border-border"></View>
                  <View className="flex flex-row items-center w-full p-3 rounded-xl bg-background-primary">
                    <Text className="me-auto text-xl text-text-primary">End Date</Text>
                    <Pressable 
                      className="p-3 rounded-xl bg-background-secondary" 
                      onPress={() => setTransactionEndDatePickerModalVisible(true)}
                    >
                      <Text className="text-xl text-text-primary">{transactionEndDate!.toDateString()}</Text>
                    </Pressable>
                    {transactionEndDatePickerModalVisible && <DateTimePicker
                      value={transactionEndDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) => {setTransactionEndDate(date || transactionEndDate); setTransactionEndDatePickerModalVisible(false)}}
                    />}
                  </View>
                </>}

              </>}

              <View className=" w-full border-hairline border-border"></View>
              <View>        
                <Pressable 
                  className="flex flex-row items-center w-full p-3 rounded-xl bg-background-primary" 
                  onPress={() => setSelectCategoryModalVisible(true)}
                >
                  <Text className="text-xl text-text-secondary">{selectedCategory === null ? "Select category" : selectedCategory.name}</Text>
                  <MaterialCommunityIcons className="ms-auto" name="chevron-right" size={24} color={colors.text.secondary} />
                </Pressable>
              </View>
              
              {transactionType === "investment" && <>
                <View className=" w-full border-hairline border-border"></View>
                <View className="flex flex-row items-center gap-4">
                  <View className="flex-1 flex flex-col gap-3">
                    <Text className="text-sm text-text-third">The amount of assets</Text>
                    <CurrencyInput
                      className="justify-start w-full text-xl font-base text-text-primary"
                      delimiter=','
                      separator='.'
                      precision={7}
                      minValue={0}
                      keyboardType="decimal-pad"
                      placeholderTextColor={colors.text.secondary}
                      value={transactionInvestmentAmountAssets}
                      onChangeValue={(value) => setTransactionInvestmentAmountAssets(value || 0)}
                    />
                  </View>
                  <Pressable className="flex flex-row">
                    <Text className="text-xl font-bold">{transactionInvestmentUnitAssets}</Text>
                    <MaterialCommunityIcons name="triangle-small-down" size={24} color="black" />
                  </Pressable>
                </View>
              </>}
              <View className=" w-full border-hairline border-border"></View>
              <TextInput
                className="justify-start w-full h-[70px] leading-[25px] text-xl font-base text-text-primary"
                keyboardType="default"
                placeholder="Note (optional)"
                placeholderTextColor={colors.text.third}
                multiline={true}
                numberOfLines={7}
                value={transactionNote}
                onChangeText={(text) => setTransactionNote(text)}
                style={{textAlignVertical: "top"}}
              />
            </View>
          </View>
        </ScrollView>
        <SelectCategoryModal 
          transactionTypeIn={transactionType}
          setSelectedCategory={setSelectedCategory}
          selectCategoryModalVisible={selectCategoryModalVisible}
          setSelectCategoryModalVisible={setSelectCategoryModalVisible}
        />
        <TransactionFrequencyModal
          transactionTypeIn={transactionType}
          transactionFrequency={transactionFrequency}
          setTransactionFrequency={setTransactionFrequency}
          transactionFrequencyInterval={transactionFrequencyInterval} 
          setTransactionFrequencyInterval={setTransactionFrequencyInterval}
          transactionEndDate={transactionEndDate}
          setTransactionEndDate={setTransactionEndDate}
          transactionFrequencyModalVisible={transactionFrequencyModalVisible}
          setTransactionFrequencyModalVisible={setTransactionFrequencyModalVisible}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default AddTransaction