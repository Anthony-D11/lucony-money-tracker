import { View, Text, ScrollView, Pressable, Modal } from 'react-native'
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors } from "@/theme-config";

const TransactionFrequencyModal = ({ 
    transactionTypeIn, 
    transactionFrequency, 
    setTransactionFrequency,
    transactionFrequencyNumber, 
    setTransactionFrequencyNumber,
    transactionFrequencyModalVisible, 
    setTransactionFrequencyModalVisible 
  }: any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const dictionary = {
    "never": "Never",
    "day": "Daily",
    "month": "Monthly",
    "year": "Yearly"
  }
  const transactionFrequencies: string[] = ["never", "day", "month", "year"];
  const transactionFrequencyNumbers = Array.from({length: 1000}, (_, i) => i + 1);

  const [transactionFrequencyPickerVisible, setTransactionFrequencyPickerVisible] = useState(true);
  const [transactionFrequencyNumberPickerVisible, setTransactionFrequencyNumberPickerVisible] = useState(false);

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
        <SafeAreaView>
          <View className="flex-row items-center gap-4 p-4 bg-background-primary">
            <Pressable onPress={() => setTransactionFrequencyModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={30} color={colors.text.primary} />
            </Pressable>
            <Text className="text-lg font-bold text-text-primary">Transaction Frequency</Text>
            <Pressable className="ms-auto"
              onPress={() => {
                if (transactionFrequency == "never") setTransactionFrequencyNumber(null);
                setTransactionFrequencyModalVisible(false);
              }}
            >
              <Text className="text-lg font-bold text-text-link">Save</Text>
            </Pressable>
          </View>
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
            <View className="flex flex-col w-full rounded-xl bg-background-secondary">
              { 
                transactionFrequencyPickerVisible ?
                  (transactionFrequencies.map((item, index) => (
                    <>
                      { index !== 0 && <View className=" w-full border-hairline border-border"></View> }
                      <Pressable className="flex flex-row items-center gap-3 p-4"
                        onPress={() => setTransactionFrequency(item)}
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
                      setTransactionFrequencyNumberPickerVisible(false);
                    }}
                  >
                    <Text className="text-xl text-text-primary">Frequency</Text>
                    <Text className="ms-auto text-xl text-text-primary">{dictionary[transactionFrequency]}</Text>
                  </Pressable>
              }
            </View>
            {transactionFrequency !== "never" &&
              <View className="flex flex-col w-full rounded-xl bg-background-secondary overflow-hidden">
              <Pressable className="flex flex-row items-center gap-3 p-4"
                onPress={() => {
                  setTransactionFrequencyNumberPickerVisible(!transactionFrequencyNumberPickerVisible);
                  setTransactionFrequencyPickerVisible(false);
                }}
              >
                <Text className="text-xl text-text-primary">Every</Text>
                <Text className="ms-auto text-xl text-text-primary">
                  {transactionFrequencyNumber > 1 ? transactionFrequencyNumber.toString() : ""} {transactionFrequency}{transactionFrequencyNumber > 1 && 's'}
                </Text>
              </Pressable>
              { transactionFrequencyNumberPickerVisible && 
                <Picker
                  mode="dropdown"
                  selectedValue={transactionFrequencyNumber}
                  onValueChange={(value) => setTransactionFrequencyNumber(value)}
                  // style={{borderRadius: "0.75rem", padding: "0.75rem", backgroundColor: colors.background.secondary, color: colors.text.primary}}
                  // itemStyle={{color: colors.text.primary, borderRadius: "0.75rem"}}
                >
                  {transactionFrequencyNumbers.map((number) => <Picker.Item key={number} label={number.toString()} value={number}/>)}
                </Picker>
              }
            </View>}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  )
}

export default TransactionFrequencyModal