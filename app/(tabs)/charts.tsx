import SimplePage from "@/components/simplePage";
import { useData } from "@/contexts/dataProvider";
import { dateItemToString } from "@/types/DateItem";
import { useTranslations } from "@/locales";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SimpleButton from "@/components/simpleButton";

export default function ChartsPage() {
  const screenWidth = Dimensions.get("window").width;
  const data = useData();
  const t = useTranslations();
  const history = data.historyData ?? [];

  const [showDataCount, setShowDataCount] = useState(31);

  const start = Math.max(0, history.length - showDataCount);
  const showDataRaw = history.slice(start);
  const showData = React.useMemo(
    () => downsample(showDataRaw, 120),
    [showDataRaw],
  );

  const skipEvery = Math.max(1, Math.ceil(showData.length / 8));
  const showDots = showData.length < 60;

  const chartData = React.useMemo(() => {
    const labels = showData.map((date, index) =>
      index % skipEvery === 0 ? dateItemToString(date.date) : "",
    );

    return {
      labels,
      yieldTotal: showData.map((item) => item.yieldTotal),
      yieldDay: showData.map((item) => item.yieldDay),
      highestWatt: showData.map((item) => item.highestWatt),
    };
  }, [showData, skipEvery]);

  function downsample<T>(data: T[], maxPoints = 120): T[] {
    if (data.length <= maxPoints) return data;

    const bucketSize = Math.ceil(data.length / maxPoints);
    const result: T[] = [];

    for (let i = 0; i < data.length; i += bucketSize) {
      result.push(data[i]);
    }

    return result;
  }

  return (
    <SimplePage headline={t.solar} enableScroll={true}>
      <View
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        {(
          [
            [7, "Week"],
            [31, "Month"],
            [93, "3 Month"],
            [182, "6 Month"],
            [365, "Year"],
          ] as const
        ).map((item) => (
          <SimpleButton
            key={item[0]}
            onPress={() => setShowDataCount(item[0])}
            title={item[1]}
          />
        ))}
      </View>

      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [{ data: chartData.yieldTotal }],
        }}
        withDots={showDots}
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
          labels: chartData.labels,
          datasets: [{ data: chartData.yieldDay }],
        }}
        withDots={showDots}
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
          labels: chartData.labels,
          datasets: [{ data: chartData.highestWatt }],
        }}
        withDots={showDots}
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
