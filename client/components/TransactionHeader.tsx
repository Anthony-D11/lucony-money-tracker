import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { colors } from "@/theme-config";

const TransactionHeader = ({title, searchText, setSearchText}: any) => {
  return (
    <View className="flex gap-[20px] px-[10px]">
      <Text className="text-2xl text-center text-text-primary"> {title} </Text>
      <View className="flex flex-row items-center gap-1 px-3 py-1 w-full rounded-xl bg-background-secondary">
        <MaterialCommunityIcons name="tag-search-outline" size={24} color={colors.text.third} />
        <TextInput
          className=" flex-grow h-[40px] leading-[20px] text-xl font-base text-text-primary bg-background-secondary"
          placeholder="Search transaction..."
          placeholderTextColor={colors.text.third}
          value={searchText}
          onChangeText={(text: string) => setSearchText(text)}
        />
      </View>
      <View className="flex flex-row gap-3">
        <Pressable className="ms-auto p-2 rounded-xl bg-background-secondary">
          <Text className="text-xl">Dec 29, 2025 - Nov 28, 2027</Text>
        </Pressable>
        <Pressable className="p-2 rounded-xl bg-background-secondary">
          <MaterialCommunityIcons name="format-list-checkbox" size={24} color={colors.text.primary}/>
        </Pressable>
        <Pressable className="p-2 rounded-xl bg-background-secondary">
          <MaterialCommunityIcons name="calendar-multiselect-outline" size={24} color={colors.text.primary}/>
        </Pressable>
      </View>
    </View>

  )
}

export default TransactionHeader