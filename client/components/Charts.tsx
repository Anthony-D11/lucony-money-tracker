import { View, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-gifted-charts";

import React, { useRef, useState } from "react";
import { colors } from "@/theme-config";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function CustomLineChart({
    expenseData,
    incomeData,
    investmentData,
}: any) {
    const screenWidth = Dimensions.get("window").width;
    const lastPointerIndex = useRef(null);
    const count = useRef(0);

    const defaultExpenseAmount = 0;
    const defaultIncomeAmount = 0;
    const defaultInvestmentAmount = 0;
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [incomeAmount, setIncomeAmount] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState(0);

    const setAmount = (
        expenseAmountIn: any,
        incomeAmountIn: any,
        investmentAmountIn: any
    ) => {
        setExpenseAmount(expenseAmountIn);
        setIncomeAmount(incomeAmountIn);
        setInvestmentAmount(investmentAmountIn);
    };

    return (
        <View>
            <ChartTopController
                expenseAmount={expenseAmount}
                incomeAmount={incomeAmount}
                investmentAmount={investmentAmount}
            />
            <LineChart
                //areaChart
                curved
                disableScroll
                adjustToWidth
                data={expenseData}
                data2={incomeData}
                data3={investmentData}
                maxValue={7000}
                height={150}
                width={screenWidth - 70}
                thickness={3}
                hideDataPoints
                initialSpacing={5}
                color1={colors.brand.red}
                startFillColor1={colors.brand.red}
                endFillColor1={colors.brand.red}
                startOpacity1={0.2}
                endOpacity1={0.0}
                color2={colors.brand.green}
                startFillColor2={colors.brand.green}
                endFillColor2={colors.brand.green}
                startOpacity2={0.2}
                endOpacity2={0.0}
                color3={colors.brand.purple}
                startFillColor3={colors.brand.purple}
                endFillColor3={colors.brand.purple}
                startOpacity3={0.2}
                endOpacity3={0.0}
                xAxisLabelTextStyle={{
                    display: "none",
                }}
                hideYAxisText
                hideAxesAndRules
                pointerConfig={{
                    showPointerStrip: false,
                    pointer1Color: colors.brand.red,
                    pointer2Color: colors.brand.green,
                    pointer3Color: colors.brand.purple,
                }}
                // Temporararily comment because of the bug caused by getPointerProps. It doesn't return index = -1 when finger is released.
                // getPointerProps={(props: any) => {
                //     console.log(props);
                //     if (props !== null && "pointerIndex" in props && props.pointerIndex !== null && props.pointerIndex !== lastPointerIndex.current) {
                //         lastPointerIndex.current = props.pointerIndex;
                        
                //         if (props.pointerIndex !== -1)
                //             setAmount(
                //                 expenseData[props.pointerIndex]["value"],
                //                 incomeData[props.pointerIndex]["value"],
                //                 investmentData[props.pointerIndex]["value"]
                //             );
                //         else {
                //             setAmount(defaultExpenseAmount, defaultIncomeAmount, defaultInvestmentAmount);
                //         }
                //     }
                // }}
                getPointerProps={(props: any) => {
                    if (props !== null && "pointerIndex" in props && props.pointerIndex !== null && props.pointerIndex !== -1) {
                        count.current += 1;
                        if (lastPointerIndex.current !== props.pointerIndex) count.current = 1;
                        lastPointerIndex.current = props.pointerIndex;
                        if (count.current % 4 === 2) {
                            count.current = 2;
                            setAmount(
                                expenseData[props.pointerIndex]["value"],
                                incomeData[props.pointerIndex]["value"],
                                investmentData[props.pointerIndex]["value"]
                            );
                        }
                        else if (count.current % 4 === 0) {
                            count.current = 0;
                            setAmount(defaultExpenseAmount, defaultIncomeAmount, defaultInvestmentAmount);
                        }
                        
                    }
                }}
            />
            <ChartBottomController />
        </View>
    );
}
function ChartTopController({
    expenseAmount,
    incomeAmount,
    investmentAmount,
}: any) {
    return (
        <View className="flex flex-col gap-3">
            <View className="flex flex-row">
                <Text className="text-text-secondary">November 2025</Text>
                <Text className="ms-auto text-text-secondary">Type</Text>
            </View>
            <View className="flex flex-row">
                <Text className="flex-grow text-left text-brand-green">
                    {incomeAmount}
                </Text>
                <Text className="flex-grow text-center text-brand-red">
                    {expenseAmount}
                </Text>
                <Text className="flex-grow text-right text-brand-purple">
                    {investmentAmount}
                </Text>
            </View>
        </View>
    );
}
function ChartBottomController() {
    return (
        <View className="flex flex-row gap-1">
            <View className="flex-grow justify-center items-center p-3 rounded-xl border border-text-secondary">
                <Text className="text-text-secondary">1W</Text>
            </View>
            <View className="flex-grow justify-center items-center p-3 rounded-xl border border-text-secondary">
                <Text className="text-text-secondary">1M</Text>
            </View>
            <View className="flex-grow justify-center items-center p-3 rounded-xl border border-text-secondary">
                <Text className="text-text-secondary">1Q</Text>
            </View>
            <View className="flex-grow justify-center items-center p-3 rounded-xl border border-text-secondary">
                <Text className="text-text-secondary">1Y</Text>
            </View>
            <View className="flex-grow justify-center items-center p-3 rounded-xl border border-text-secondary">
                <MaterialCommunityIcons
                    name="all-inclusive"
                    size={20}
                    color={colors.text.secondary}
                />
            </View>
            <View className="flex-grow justify-center items-center p-3 rounded-xl border border-text-secondary">
                <MaterialCommunityIcons
                    name="calendar-range-outline"
                    size={20}
                    color={colors.text.secondary}
                />
            </View>
        </View>
    );
}
function buildDataSet() { }
