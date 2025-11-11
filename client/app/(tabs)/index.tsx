import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatsCard from "../components/stats_card";

export default function Index() {
  return (
    <SafeAreaView>
      <View className="">
        <MaterialCommunityIcons name="menu" size={24} color="black" />
        <Text> Lucony </Text>
      </View>
      <View><Text>Chart</Text></View>
      <View className="rows-2 gap-4 lg:rows-4 lg:gap-8">
        <StatsCard name="Expenses" amount="100$" time="This month" description="+10% gain" />
        <StatsCard name="Expenses" amount="100$" time="This month" description="+10% gain" />
        <StatsCard name="Expenses" amount="100$" time="This month" description="+10% gain" />
        <StatsCard name="Expenses" amount="100$" time="This month" description="+10% gain" />
      </View>
    </SafeAreaView>
  );
}
