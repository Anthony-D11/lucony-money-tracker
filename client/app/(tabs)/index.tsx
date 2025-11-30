import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FlatList, Text, View, ScrollView, Dimensions } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { colors } from "@/theme-config";
import StatsCard from "@/components/StatsCard";
import TransactionCard from "@/components/TransactionCard";
import CustomLineChart from "@/components/Charts";

export default function Index() {
  const data = [
    { id: 1, name: "Expenses", amount: "100$", time: "This month", description: "+10% gain" },
    { id: 2, name: "Expenses", amount: "100$", time: "This month", description: "+10% gain" },
    { id: 3, name: "Expenses", amount: "100$", time: "This month", description: "+10% gain" },
    { id: 4, name: "Expenses", amount: "100$", time: "This month", description: "+10% gain" }
  ];
  const incomeData = [
    { value: 4000, label: "Jan"},
    { value: 4500, label: "Feb"},
    { value: 4200, label: "Mar"},
    { value: 6100, label: "Apr"},
    { value: 5000, label: "May"},
    { value: 4000, label: "June"},
    { value: 4500, label: "July"},
    { value: 4200, label: "Aug"},
    { value: 5100, label: "Sep"},
    { value: 5000, label: "Oct"},
    { value: 5000, label: "Nov"},
    { value: 5000, label: "Dec"},
  ];

  // 2. DATASET B: Expenses (Red)
  const expenseData = [
    { value: 2800, label: "Jan"},
    { value: 3000, label: "Feb"},
    { value: 3800, label: "Mar"}, // High spending month
    { value: 2500, label: "Apr"},
    { value: 2700, label: "May"},
    { value: 2800, label: "June"},
    { value: 3000, label: "July"},
    { value: 3800, label: "Aug"}, // High spending month
    { value: 2500, label: "Sep"},
    { value: 2700, label: "Oct"},
    { value: 5000, label: "Nov"},
    { value: 5000, label: "Dec"},
  ];

  const investmentData = [
    { value: 5000, label: "Jan"},
    { value: 3000, label: "Feb"},
    { value: 3800, label: "Mar"}, // High spending month
    { value: 5100, label: "Apr"},
    { value: 5000, label: "May"},
    { value: 2800, label: "June"},
    { value: 3000, label: "July"},
    { value: 3800, label: "Aug"}, // High spending month
    { value: 2800, label: "Sep"},
    { value: 2700, label: "Oct"},
    { value: 2500, label: "Nov"},
    { value: 2700, label: "Dec"},
  ];
  const screenWidth = Dimensions.get('window').width;
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} 
        className="flex flex-1 min-h-screen bg-background-primary"
        contentContainerStyle={{ 
          gap: 10,
          paddingInline: 10,
          paddingTop: 10,
          paddingBottom: tabBarHeight + 50 
        }}
      >
        <View>
          <MaterialCommunityIcons name="menu" size={24} color={colors.text.primary}/>
          <Text className="text-2xl text-center text-text-primary"> Lucony </Text>
        </View>
        <View className="p-4 bg-background-secondary rounded-xl border border-border">
          <CustomLineChart expenseData={expenseData} incomeData={incomeData} investmentData={investmentData}/>
        </View >
        <View className="flex flex-row flex-wrap">
          {
            data.map((item) => (<StatsCard name={item.name} amount={item.amount} time={item.time} description={item.description} />))
          }
        </View>
        <View className="flex flex-row">
          <Text className="text-text-primary"> Recent Transactions </Text>
          <Link className="text-text-link ms-auto" href="/"> {"See all  >"} </Link>
        </View>
        <View className="flex flex-col gap-3">
          <TransactionCard id="001" type="expense" amount={85.20} currency="$" categoryId="001" createdAt="Today" note="Dinner with Alex"/>
          <TransactionCard id="001" type="income" amount={1285.20} currency="$" categoryId="001" createdAt="Today" note="Dinner with Alex"/>
          <TransactionCard id="001" type="expense" amount={7236.23} currency="$" categoryId="001" createdAt="Today" note="Dinner with Alex"/>
          <TransactionCard id="001" type="expense" amount={85.20} currency="$" categoryId="001" createdAt="Today" note="Dinner with Alex"/>
          <TransactionCard id="001" type="expense" amount={85.20} currency="$" categoryId="001" createdAt="Today" note="Dinner with Alex"/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
