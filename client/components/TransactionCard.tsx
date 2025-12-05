import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text } from 'react-native'
import React from 'react'
import { Expense, Income, Investment, Transaction } from '@/models/models'
import { colors } from "@/theme-config";

const TransactionCard = ({ type, amount, currency, categoryId, createdAt, note }: Expense | Income | Investment) => {
    return (
        <View className='flex flex-row gap-3 justify-start items-center w-full p-4  rounded-xl border bg-background-secondary  hover:border-brand-blue'>
            <MaterialCommunityIcons name="shopping-outline" size={30} color={colors.text.secondary} />
            <View className="flex flex-col">
                <Text className="text-text-primary">Category Name</Text>
                <Text className="text-text-secondary">{note}</Text>
            </View>
            <View className="flex flex-col ms-auto items-end">
                <Text className={(type === "expense" || (false)) ? 
                    "text-brand-red": 
                    "text-brand-green"
                    }>{(type === "expense" || (false)) ? "-": ""}{amount}{currency}</Text>
                <Text className="text-text-third">{createdAt}</Text>
            </View>
        </View >
    )
}

export default TransactionCard;