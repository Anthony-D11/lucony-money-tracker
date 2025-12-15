import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text } from 'react-native'
import React from 'react'
import { colors } from "@/theme-config";
import { Category, Transaction } from "@/models";
import { useQuery, useRealm } from '@/contexts/RealmContext';

const TransactionCard = ({ type, amount, currency, categoryId, createdAt, note }: Transaction) => {
    const realm = useRealm();
    const category: Category | null = realm.objectForPrimaryKey("Category", categoryId);
    return (
        <View className='flex flex-row gap-3 justify-start items-center w-full p-4  rounded-xl border bg-background-secondary  hover:border-brand-blue'>
            <MaterialCommunityIcons name={category?.icon} size={30} color={colors.text.secondary} />
            <View className="flex flex-col">
                <Text className="text-text-primary">{category?.name}</Text>
                <Text className="text-text-secondary">{note}</Text>
            </View>
            <View className="flex flex-col ms-auto items-end">
                <Text className={(type === "expense" || (false)) ? 
                    "text-brand-red": 
                    "text-brand-green"
                    }>{(type === "expense" || (false)) ? "-": ""}{amount.toString()} {currency}</Text>
                <Text className="text-text-third">{createdAt.toDateString()}</Text>
            </View>
        </View >
    )
}

export default TransactionCard;