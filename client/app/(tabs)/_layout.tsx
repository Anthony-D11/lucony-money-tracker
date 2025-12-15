import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import themeOptions from '../../theme-config';

function TabBarIcon({ focused, icon, title, focusedIconColor }: any) {
    var defaultTextColor = themeOptions.colors.text.secondary;
    return (
        <View className="flex flex-col w-full min-w-[120px] min-h-14 mt-4 justify-center items-center rounded-xl overflow-hidden">
            <MaterialCommunityIcons name={icon} size={24} color={(focused && focusedIconColor ? focusedIconColor : defaultTextColor)} />
            <Text className={`${focused ? "text-text-primary" : "text-text-secondary"} text-[8px] mt-1`}>{title}</Text>
        </View>
    );
}

function AddTransactionButton() {
    return (
        <View className="flex justify-center items-center w-10 h-10 rounded-full bg-brand-blue">
            <MaterialCommunityIcons name="plus" size={30} color={themeOptions.colors.text.primary} />
        </View>
    );
}

export default function _Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    paddingHorizontal: 5,
                    paddingTop: 5,
                    // backgroundColor: themeOptions.colors.background,
                    height: 80
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabBarIcon icon="view-dashboard-outline" title="Dashboard" focused={focused} focusedIconColor={themeOptions.colors.brand["dashboard-icon"]} />)
                }}
            />
            <Tabs.Screen
                name="expenses"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabBarIcon icon="trending-down" title="Expenses" focused={focused} focusedIconColor={themeOptions.colors.brand["expenses-icon"]} />)
                }}
            />
            <Tabs.Screen
                name="add_transaction"
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<AddTransactionButton/>)
                }}
            />
            <Tabs.Screen
                name="earnings"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabBarIcon icon="trending-up" title="Earnings" focused={focused} focusedIconColor={themeOptions.colors.brand["earnings-icon"]} />)
                }}
            />
            <Tabs.Screen
                name="investments"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (<TabBarIcon icon="bitcoin" title="Investments" focused={focused} focusedIconColor={themeOptions.colors.brand["investments-icon"]} />)
                }}
            />
        </Tabs>
    );
}
