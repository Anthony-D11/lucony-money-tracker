import { View, Text, ScrollView, TextInput, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors } from "@/theme-config";
import { Category } from '@/models/models';
import AddCategoryModal from './AddCategoryModal';

const SelectCategoryModal = ({ transactionTypeIn, selectCategoryModalVisible, setSelectCategoryModalVisible }: any) => {
  const tabBarHeight = useBottomTabBarHeight();
  const [addCategoryModalVisible, setAddCategoryModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState(transactionTypeIn);
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);


  let existingCategories: Array<Category> = [
    {
      "id": "001",
      "name": "Housing",
      "icon": "greenhouse",
      "color": "yellow",
      "type": "default",
      "default": true
    },
    {
      "id": "002",
      "name": "Car",
      "icon": "car",
      "color": "green",
      "type": "default",
      "default": true
    },
    {
      "id": "003",
      "name": "Crypto",
      "icon": "bitcoin",
      "color": "purple",
      "type": "investment",
      "default": true
    }
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={selectCategoryModalVisible}
      onRequestClose={setSelectCategoryModalVisible(false)}
    >
      <SafeAreaProvider>
        <SafeAreaView>
          <View className="flex-row items-center gap-4 p-4 bg-background-primary">
            <Pressable onPress={() => setSelectCategoryModalVisible(false)}>
              <MaterialCommunityIcons name="close" size={30} color={colors.text.primary} />
            </Pressable>
            <Text className="text-lg font-bold text-text-primary">Select Category</Text>
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
            <View className="flex flex-col justify-center items-center gap-3 p-3 w-full bg-background-secondary rounded-xl">
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
            </View>
            <Pressable className="flex flex-row items-center gap-3 p-3 w-full bg-background-secondary rounded-xl"
              onPress={() => setAddCategoryModalVisible(true)}
            >
              <View className="w-[40px] h-[40px] justify-center items-center rounded-full ">
                <MaterialCommunityIcons name="plus-circle" size={24} color={colors.brand.blue}/>
              </View>
              <Text className="text-xl text-text-secondary">New category</Text>
            </Pressable>
            <View className=" flex flex-row items-center gap-1 px-3 py-1 w-full rounded-xl bg-background-secondary">
              <MaterialCommunityIcons name="tag-search-outline" size={24} color={colors.text.third} />
              <TextInput
                  className=" flex-grow h-10 leading-[20px] text-xl font-base text-text-primary bg-background-secondary"
                  placeholder="Search category"
                  placeholderTextColor={colors.text.third}
                  textContentType="none"
                  value={searchText}
                  onChangeText={(text: string) => setSearchText(text)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(searchText !== "")}
              />
              {isFocused && (
                <Pressable id="cancel-button" onPress={() => {
                  setSearchText("");
                  setIsFocused(false);
                }}>
                  <Text className="text-xl text-text-link">Cancel</Text>
                </Pressable>
              )}
            </View>
            <View className="flex flex-col justify-center gap-3 p-3 w-full bg-background-secondary rounded-xl">
              {existingCategories.map((item: Category, index: number) => (
                <>
                  {index > 0 && (<View className=" w-full border-hairline border-border"></View>)}
                  <Pressable className="flex flex-row items-center gap-3">
                    <View className="w-[40px] h-[40px] justify-center items-center rounded-full bg-brand-blue">
                      <MaterialCommunityIcons name={item.icon} size={24} colors={item.color}/>
                    </View>
                    <Text className="text-xl text-text-secondary">{item.name}</Text>
                  </Pressable>
                </>
              ))}
            </View >
          </ScrollView>
          <AddCategoryModal 
            transactionTypeIn={"expense"} 
            addCategoryModalVisible={addCategoryModalVisible}
            setAddCategoryModalVisible={setAddCategoryModalVisible}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  )
}

export default SelectCategoryModal