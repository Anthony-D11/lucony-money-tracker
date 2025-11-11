import { View, Text } from 'react-native'
import React from 'react'

const StatsCard = ({ name, amount, time, description }: any) => {
    return (
        <View>
            <Text className=''>{name}</Text>
            <Text className='text-green-500'>{amount}</Text>
            <Text>{time}</Text>
            <Text>{description}</Text>
        </View>
    )
}

export default StatsCard