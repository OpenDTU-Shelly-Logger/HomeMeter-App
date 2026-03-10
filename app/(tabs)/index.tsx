import HomePageDataOverview from "@/components/homePageDataOverview";
import IndividualCellDisplay from "@/components/individualCellDisplay";
import SectionHeadline from "@/components/sectionHeadline";
import SimplePage from "@/components/simplePage";
import SingleValueBox from "@/components/singleValueBox";
import VerticalView from "@/components/verticalView";
import { useData } from "@/contexts/dataProvider";
import { formatNumber } from "@/helper/formatHelper";
import { useTranslations } from "@/locales";
import React from "react";
import { View } from "react-native";

export default function SolarOverview() {
  const data = useData();
  const t = useTranslations();

  const todayData = data.historyData[data.historyData.length - 1];

  const calculateTotalExported = () => {
    let total = 0;
    data.historyData?.forEach((item) => {
      if (item.exportedWH === undefined) return;
      total += item.exportedWH;
    });
    return total;
  };
  const calculateTotalConsumed = () => {
    let total = 0;
    data.historyData?.forEach((item) => {
      if (item.consumedWH === undefined) return;
      total += item.consumedWH;
    });
    return total;
  };

  const calculateTotalSolarUsed = () => {
    let total = 0;
    data.historyData?.forEach((item) => {
      if (item.selfUsedWH === undefined) return;
      total += item.selfUsedWH;
    });
    return total;
  };

  return (
    <SimplePage headline={t.overview} enableScroll={true}>
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        <HomePageDataOverview
          leftTitle={formatNumber(
            data.liveSolarData?.total.Power.v,
            1,
            data.liveSolarData?.total.Power.u,
          )}
          rightTitle={formatNumber(
            (data.livePowerData?.total_power ?? 0) <= 0
              ? 0
              : data.livePowerData?.total_power,
            1,
            "W",
          )}
          bottomTitle={formatNumber(
            (data.livePowerData?.total_power ?? 0) +
              (data.liveSolarData?.total.Power.v ?? 0),
            1,
            "W",
          )}
          leftIcon="sunny"
          rightIcon="flash"
          bottomIcon="home"
          lineText={formatNumber(
            (data.livePowerData?.total_power ?? 0 < 0)
              ? -1 * (data.livePowerData?.total_power ?? 0)
              : 0,
            1,
            "W",
          )}
          useSolarPower={(data.liveSolarData?.total.Power.v ?? 0) > 0}
          useGridPower={(data.livePowerData?.total_power ?? 0) > 0}
        />
        <SectionHeadline text={t.today} />
        <SingleValueBox
          height={30}
          headline={t.yieldToday}
          value={formatNumber(
            data.liveSolarData?.total.YieldDay.v,
            0,
            data.liveSolarData?.total.YieldDay.u,
          )}
        />

        <SingleValueBox
          height={30}
          headline={t.peak}
          value={formatNumber(todayData?.highestWatt, 0, "W")}
        />

        {todayData &&
          todayData.consumedWH !== undefined &&
          todayData.exportedWH !== undefined &&
          todayData.selfConsumptionRatio !== undefined &&
          todayData.selfUsedWH !== undefined &&
          todayData.autarkyRatio !== undefined && (
            <>
              <SingleValueBox
                height={30}
                headline={t.houseConsumption}
                value={formatNumber(todayData.consumedWH, 0, "Wh")}
              />
              <SingleValueBox
                height={30}
                headline={t.gridFeedIn}
                value={formatNumber(todayData.exportedWH, 0, "Wh")}
              />
              <SingleValueBox
                height={30}
                headline={t.usedSolarPower}
                value={formatNumber(todayData.selfUsedWH, 0, "Wh")}
              />
              <SingleValueBox
                height={30}
                headline={t.selfConsumptionRate}
                value={formatNumber(
                  todayData.selfConsumptionRatio * 100,
                  0,
                  "%",
                )}
              />
              <SingleValueBox
                height={30}
                headline={t.autarkyRate}
                value={formatNumber(todayData.autarkyRatio * 100, 0, "%")}
              />
              <SectionHeadline text={t.total} />
              <SingleValueBox
                height={30}
                headline={t.totalYield}
                value={formatNumber(
                  data.liveSolarData?.total.YieldTotal.v,
                  0,
                  data.liveSolarData?.total.YieldTotal.u,
                )}
              />
              <SingleValueBox
                height={30}
                headline={t.totalPowerConsumption}
                value={formatNumber(calculateTotalConsumed() / 1000, 0, "kWh")}
              />
              <SingleValueBox
                height={30}
                headline={t.totalSolarUsed}
                value={formatNumber(calculateTotalSolarUsed() / 1000, 0, "kWh")}
              />
              <SingleValueBox
                height={30}
                headline={t.totalGridFeedIn}
                value={formatNumber(calculateTotalExported() / 1000, 0, "kWh")}
              />
            </>
          )}
        <View style={{ marginTop: 10 }} />
        <SectionHeadline text={t.cellYield} />
        <IndividualCellDisplay />
      </VerticalView>
    </SimplePage>
  );
}
