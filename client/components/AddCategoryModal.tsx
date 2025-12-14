import { View, Text, ScrollView, TextInput, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors } from "@/theme-config";
import appData from "../assets/data/app_data.json";
import { useRealm } from '@/contexts/RealmContext';
import { Category } from '@/models';

const AddCategoryModal = ({ transactionTypeIn, addCategoryModalVisible, setAddCategoryModalVisible }: any) => {
  const realm = useRealm();

  const tabBarHeight = useBottomTabBarHeight();
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("default");
  const [categoryColor, setCategoryColor] = useState(appData["colors"][0]);
  const [categoryIcon, setCategoryIcon] = useState("");

  const saveCategory = () => {
    realm.write(() => {
      realm.create("Category", Category.generate(categoryName, categoryType, categoryColor, categoryIcon));
    })
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addCategoryModalVisible}
      onRequestClose={() => {
        setAddCategoryModalVisible(false);
      }}
    >
      <SafeAreaProvider>
        <SafeAreaView>
          <View className="flex-row items-center gap-4 p-4 bg-background-primary">
            <Pressable onPress={() => setAddCategoryModalVisible(false)}>
              <MaterialCommunityIcons name="chevron-left" size={35} color={colors.text.primary} />
            </Pressable>
            <Text className="text-lg font-bold text-text-primary">Add Category</Text>
            <Pressable className="ms-auto me-3" onPress={() => {
                saveCategory();
                setAddCategoryModalVisible(false);
              }}>
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
            <View className="flex flex-col justify-center items-start gap-3 p-4 w-full rounded-xl bg-background-secondary">
              <TextInput
                className="w-full leading-[40px] text-4xl font-bold text-text-primary"
                placeholder="Category Name"
                placeholderTextColor={colors.text.secondary}
                textContentType="none"
                value={categoryName}
                onChangeText={(text) => setCategoryName(text)}
                autoFocus={true}
              />
              <View className=" w-full border-hairline border-border"></View>
              <View className="flex flex-row items-center gap-4">
                <MaterialCommunityIcons name="format-list-bulleted-type" size={30} color={colors.text.secondary} />
                <View className="flex flex-col gap-2">
                  <Text className="text-sm text-text-third">Category Type</Text>
                  <View className="flex flex-row gap-2 justify-center items-center p-1 h-12 rounded-xl bg-background-primary">
                    <Pressable className={`justify-center items-center p-2 rounded-xl ${categoryType === "default" && "bg-background-secondary"}`}
                      onPress={() => setCategoryType("default")}  
                    > 
                      <Text className="text-text-primary">Expense/Earning</Text>
                    </Pressable>
                    <Pressable className={`justify-center items-center p-2 rounded-xl ${categoryType === "investment" && "bg-background-secondary"}`}
                      onPress={() => setCategoryType("investment")}
                    > 
                      <Text className="text-text-primary">Investment</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View className=" w-full border-hairline border-border"></View>
              <View className="flex flex-row items-start gap-4">
                <MaterialCommunityIcons name="format-color-fill" size={30} color={colors.text.secondary} />
                <View className="flex-1 flex flex-col gap-3">
                  <Text className="text-sm text-text-third">Select Color</Text>
                  <View className="flex flex-row flex-wrap gap-5">
                    {
                      appData["colors"].map((color) => (
                        <Pressable className={`w-12 h-12 rounded-full ${color === categoryColor ? "border-2 border-text-primary" : ""}`} 
                          style={{backgroundColor: color}}
                          onPress={() => setCategoryColor(color)}
                        />
                      ))
                    }
                  </View>
                </View>
              </View>
              <View className=" w-full border-hairline border-border"></View>
              <View className="flex flex-row items-start gap-4">
                <MaterialCommunityIcons name="emoticon-plus-outline" size={30} color={colors.text.secondary} />
                <View className="flex-1 flex flex-col gap-3">
                  <Text className="text-sm text-text-third">Select Icon</Text>
                  <View className="flex flex-row flex-wrap gap-5">
                    {
                      appData["categoryIcons"].map((icon) => (
                        <Pressable className={`justify-center items-center w-12 h-12 rounded-full ${icon === categoryIcon ? "border-2 border-text-primary" : ""}`}
                          onPress={() => setCategoryIcon(icon)}
                        >
                          <MaterialCommunityIcons name={icon} color={colors.text.primary} size={24}/>
                        </Pressable>
                      ))
                    }
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  )
}

export default AddCategoryModal