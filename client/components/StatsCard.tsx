import { View, Text } from 'react-native'
import React from 'react'

const StatsCard = ({ name, amount, time, description }: any) => {
    return (
        <View className='w-[45%] m-2 p-4 bg-background-secondary rounded-xl border border-border hover:border-brand-blue'>
            <Text className="text-text-primary">{name}</Text>
            <Text className='text-brand-green'>{amount}</Text>
            <Text>{time}</Text>
            <Text>{description}</Text>
        </View >
    )
}

export default StatsCard