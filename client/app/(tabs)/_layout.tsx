import { Stack, Tabs } from "expo-router";
import { View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function TabBarIcon({ focused, name, title }: any) {
    return (
        <View>
            <MaterialCommunityIcons name={name} size={24} color="black" />
        </View>
    );
}

export default function _Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Dashboard",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabBarIcon name="view-dashboard-outline" />)
                }}
            />
            <Tabs.Screen
                name="expenses"
                options={{
                    "title": "Expenses",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabBarIcon name="trending-down" />)
                }}
            />
            <Tabs.Screen
                name="earnings"
                options={{
                    "title": "Earnings",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabBarIcon name="trending-up" />)
                }}
            />
            <Tabs.Screen
                name="investments"
                options={{
                    "title": "Investments",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabBarIcon name="bitcoin" />)
                }}
            />
        </Tabs>
    );
}
