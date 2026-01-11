import { View, Text, ScrollView, Pressable, Modal, TextInput } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DropDownPicker from 'react-native-dropdown-picker';


import { colors } from "@/theme-config";
import { TransactionFrequency } from '@/models';

interface TransactionFrequencyModalProps {
  transactionTypeIn: string; 
  transactionFrequency: TransactionFrequency; 
  setTransactionFrequency: (transactionFrequency: TransactionFrequency) => void;
  transactionFrequencyInterval: number | null; 
  setTransactionFrequencyInterval: (transactionFrequencyInterval: number | null) => void;
  transactionEndDate: Date | null;
  setTransactionEndDate: (transactionEndDate: Date | null) => void;
  transactionFrequencyModalVisible: boolean;
  setTransactionFrequencyModalVisible: (transactionFrequencyModalVisible: boolean) => void;
}

const TransactionFrequencyModal = ({ 
    transactionTypeIn, 
    transactionFrequency, 
    setTransactionFrequency,
    transactionFrequencyInterval, 
    setTransactionFrequencyInterval,
    transactionEndDate,
    setTransactionEndDate,
    transactionFrequencyModalVisible, 
    setTransactionFrequencyModalVisible 
  }: TransactionFrequencyModalProps) => {
  const tabBarHeight = 80;//useBottomTabBarHeight();
  const dictionary = {
    "never": "Never",
    "day": "Daily",
    "month": "Monthly",
    "year": "Yearly"
  }
  const transactionFrequencies: TransactionFrequency[] = ["never", "day", "month", "year"];
  const [transactionFrequencyIntervals, setTransactionFrequencyIntervals] = useState(
      Array.from({length: 10}, (_, i) => {
        return {label: (i+1).toString(), value: i+1};
      }));
  
  const [transactionFrequencyPickerVisible, setTransactionFrequencyPickerVisible] = useState(true);
  const [transactionFrequencyIntervalPickerVisible, setTransactionFrequencyIntervalPickerVisible] = useState(false);

  return (  
    <Modal
      animationType="slide"
      transparent={true}
      visible={transactionFrequencyModalVisible}
      onRequestClose={() => {
        setTransactionFrequencyModalVisible(false);
      }}
    >
      <SafeAreaProvider>
        <SafeAreaView className="flex flex-1 bg-background-secondary">
          <View className="flex-row items-center gap-4 p-4 bg-background-primary">
            <Pressable onPress={() => setTransactionFrequencyModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={30} color={colors.text.primary} />
            </Pressable>
            <Text className="text-lg font-bold text-text-primary">Transaction Frequency</Text>
            <Pressable className="ms-auto"
              onPress={() => {
                if (transactionFrequency === "never") setTransactionFrequencyInterval(null);
                setTransactionFrequencyModalVisible(false);
              }}
            >
              <Text className="text-lg font-bold text-text-link">Save</Text>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}
            className="flex flex-grow"
            nestedScrollEnabled={true}
            contentContainerStyle={{
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingInline: 10,
              paddingTop: 10,
              paddingBottom: tabBarHeight + 50,
            }}
          >
            <View className="flex flex-col w-full rounded-xl bg-background-primary">
              { 
                transactionFrequencyPickerVisible ?
                  (transactionFrequencies.map((item, index) => (
                    <>
                      { index !== 0 && <View className=" w-full border-hairline border-border"></View> }
                      <Pressable className="flex flex-row items-center gap-3 p-4"
                        onPress={() => {
                          setTransactionFrequencyInterval(1);
                          setTransactionFrequency(item);
                          if (item === "never") setTransactionFrequencyInterval(null);
                        }}
                      >
                        { item === transactionFrequency ? 
                          <MaterialCommunityIcons name="check" size={24} color={colors.text.primary} /> : 
                          <View className="w-[24px]"/>
                        }
                        
                        <Text className="text-xl text-text-primary">{item}</Text>
                      </Pressable>
                    </>
                  ))) :
                  <Pressable className="flex flex-row items-center p-4" 
                    onPress={() => {
                      setTransactionFrequencyPickerVisible(true);
                      setTransactionFrequencyIntervalPickerVisible(false);
                    }}
                  >
                    <Text className="text-xl text-text-primary">Frequency</Text>
                    <Text className="ms-auto text-xl text-text-primary">{dictionary[transactionFrequency]}</Text>
                  </Pressable>
              }
            </View>
            {transactionFrequency !== "never" &&
            <View className="flex flex-col w-full rounded-xl bg-background-primary">
              <View className="flex flex-row items-center z-50 gap-3 p-4">
                <Text className="text-xl text-text-primary">Every</Text>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  open={transactionFrequencyIntervalPickerVisible}
                  value={transactionFrequencyInterval}
                  items={transactionFrequencyIntervals}
                  setOpen={setTransactionFrequencyIntervalPickerVisible}
                  setValue={setTransactionFrequencyInterval}
                  setItems={setTransactionFrequencyIntervals}
                  scrollViewProps={{
                    nestedScrollEnabled: true, 
                  }}
                  style={{
                    borderWidth: 0,
                    backgroundColor: colors.background.secondary
                  }}
                  containerStyle={{
                    width: 70,
                    marginLeft: "auto"
                  }}
                />
                <Text className="text-xl text-text-primary">
                  {transactionFrequency}{transactionFrequencyInterval! > 1 && 's'}
                </Text>
              </View>
            </View>}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  )
}

export default TransactionFrequencyModal