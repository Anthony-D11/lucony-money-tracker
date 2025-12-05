import { View, Text, ScrollView, TextInput, Pressable, Modal } from 'react-native'
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors } from "@/theme-config";

const TransactionFrequencyModal = ({ transactionTypeIn, transactionFrequencyModalVisible, setTransactionFrequencyModalVisible }: any) => {
  const tabBarHeight = useBottomTabBarHeight();

  const transactionFrequencies: [string, string][] = [["Never", ""], ["Daily", "day"], ["Weekly", "week"], ["Monthly", "month"], ["Yearly", "year"]];
  const [transactionFrequency, setTransactionFrequency] = useState<[string, string]>(transactionFrequencies[0]);
  const [transactionFrequencyPickerVisible, setTransactionFrequencyPickerVisible] = useState(true);

  const transactionFrequencyNumbers = Array.from({length: 1000}, (_, i) => i + 1);
  const [transactionFrequencyNumber, setTransactionFrequencyNumber] = useState(transactionFrequencyNumbers[0]);
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
            <Pressable className="ms-auto">
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
                        { item[0] === transactionFrequency[0] ? 
                          <MaterialCommunityIcons name="check" size={24} color={colors.text.primary} /> : 
                          <View className="w-[24px]"/>
                        }
                        
                        <Text className="text-xl text-text-primary">{item[0]}</Text>
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
                    <Text className="ms-auto text-xl text-text-primary">{transactionFrequency[0]}</Text>
                  </Pressable>
              }
            </View>
            {transactionFrequency[0] !== "Never" &&
              <View className="flex flex-col w-full rounded-xl bg-background-secondary overflow-hidden">
              <Pressable className="flex flex-row items-center gap-3 p-4"
                onPress={() => {
                  setTransactionFrequencyNumberPickerVisible(!transactionFrequencyNumberPickerVisible);
                  setTransactionFrequencyPickerVisible(false);
                }}
              >
                <Text className="text-xl text-text-primary">Every</Text>
                <Text className="ms-auto text-xl text-text-primary">
                  {transactionFrequencyNumber > 1 ? transactionFrequencyNumber.toString(): ""} {transactionFrequency[1]}{transactionFrequencyNumber > 1 && 's'}
                </Text>
              </Pressable>
              { transactionFrequencyNumberPickerVisible && 
                <Picker
                  selectedValue={transactionFrequencyNumber}
                  onValueChange={(value) => setTransactionFrequencyNumber(value)}
                  style={{borderRadius: "0.75rem", padding: "0.75rem", backgroundColor: colors.background.secondary, color: colors.text.primary}}
                  itemStyle={{color: colors.text.primary, borderRadius: "0.75rem"}}
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