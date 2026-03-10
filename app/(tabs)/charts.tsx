import SimplePage from "@/components/simplePage";
import { useData } from "@/contexts/dataProvider";
import { dateItemToString } from "@/types/DateItem";
import React from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function ChartsPage() {
  const screenWidth = Dimensions.get("window").width;
  const data = useData();
  const showDataCount = 31;
  const showData = data.historyData.slice(
    data.historyData.length - showDataCount,
  );
  const skipEvery = showData.length > 20 ? 7 : 1;

  return (
    <SimplePage headline="Solar" enableScroll={true}>
      <LineChart
        data={{
          labels: showData.map((date, index) =>
            index % skipEvery === 0 ? dateItemToString(date.date) : "",
          ),
          datasets: [
            {
              data: showData.map((item) => item.yieldTotal),
            },
          ],
        }}
        width={screenWidth - 22}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#556688",
          backgroundGradientTo: "#4499bb",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#bb00ff",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <LineChart
        data={{
          labels: showData.map((date, index) =>
            index % skipEvery === 0 ? dateItemToString(date.date) : "",
          ),
          datasets: [
            {
              data: showData.map((item) => item.yieldDay),
            },
          ],
        }}
        width={screenWidth - 22}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#445599",
          backgroundGradientTo: "#445577",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#ff00bb",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <LineChart
        data={{
          labels: showData.map((date, index) =>
            index % skipEvery === 0 ? dateItemToString(date.date) : "",
          ),
          datasets: [
            {
              data: showData.map((item) => item.highestWatt),
            },
          ],
        }}
        width={screenWidth - 22}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#994455",
          backgroundGradientTo: "#774455",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#ffbb00",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </SimplePage>
  );
}
