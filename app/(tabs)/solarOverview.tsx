import SectionHeadline from "@/components/sectionHeadline";
import SimpleKeyValueBox from "@/components/simpleKeyValueBox";
import SimplePage from "@/components/simplePage";
import SimpleText from "@/components/simpleText";
import SingleValueBox from "@/components/singleValueBox";
import VerticalView from "@/components/verticalView";
import { useData } from "@/contexts/dataProvider";
import { useTranslations } from "@/locales";
import React from "react";

export default function SolarOverview() {
  const data = useData();
  const t = useTranslations();

  const summaryData = data.liveSolarData?.inverters[0].AC[0];

  return (
    <SimplePage headline={t.solar} enableScroll={true}>
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        <SingleValueBox
          headline={t.totalYield}
          value={
            (data.liveSolarData?.total.YieldTotal.v.toFixed(1) ?? "") +
            data.liveSolarData?.total.YieldTotal.u
          }
        />
        <SingleValueBox
          headline={t.yieldToday}
          value={
            (data.liveSolarData?.total.YieldDay.v.toFixed(0) ?? "") +
            data.liveSolarData?.total.YieldDay.u
          }
        />
        <SingleValueBox
          headline={t.currentPower}
          value={
            (data.liveSolarData?.total.Power.v.toFixed(2) ?? "") +
            data.liveSolarData?.total.Power.u
          }
        />
        <SingleValueBox
          headline={t.peak}
          value={
            (data.historyData[data.historyData.length - 1]?.highestWatt.toFixed(
              1,
            ) ?? "") + "W"
          }
        />
        <SingleValueBox
          headline={t.temperature}
          value={
            (data.historyData[data.historyData.length - 1]?.temperature.toFixed(
              1,
            ) ?? "") + "°C"
          }
        />
      </VerticalView>
      <SectionHeadline text={t.solarPanels} />

      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        {data.liveSolarData?.inverters[0].DC &&
          Object.values(data.liveSolarData?.inverters[0].DC).map(
            (value, index) => {
              if (value.name.u !== "-" && value.name.u !== "Leer") {
                return (
                  <SimpleKeyValueBox
                    headline={value.name.u}
                    key={index}
                    data={[
                      {
                        key: t.power,
                        value: value.Power.v.toFixed(1) + value.Power.u,
                      },
                      {
                        key: t.voltage,
                        value: value.Voltage.v.toFixed(1) + value.Voltage.u,
                      },
                      {
                        key: t.current,
                        value: value.Current.v.toFixed(1) + value.Current.u,
                      },
                      {
                        key: t.dailyYield,
                        value: value.YieldDay.v.toFixed(0) + value.YieldDay.u,
                      },
                      {
                        key: t.totalYield,
                        value:
                          value.YieldTotal.v.toFixed(0) + value.YieldTotal.u,
                      },
                      {
                        key: t.irradiation,
                        value:
                          value.Irradiation?.v.toFixed(0) +
                          (value.Irradiation?.u ?? ""),
                      },
                    ]}
                  />
                );
              }
              return null;
            },
          )}
      </VerticalView>
      <SectionHeadline text={t.inverter} />
      {summaryData && (
        <VerticalView
          style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
        >
          <SimpleKeyValueBox
            data={[
              {
                key: t.power,
                value: summaryData.Power.v.toFixed(2) + summaryData.Power.u,
              },
              {
                key: t.voltage,
                value: summaryData.Voltage.v.toFixed(2) + summaryData.Voltage.u,
              },
              {
                key: t.current,
                value: summaryData.Current.v.toFixed(2) + summaryData.Current.u,
              },
              {
                key: t.dailyYield,
                value: summaryData.YieldDay.v + summaryData.YieldDay.u,
              },
              {
                key: t.totalYield,
                value:
                  summaryData.YieldTotal.v.toFixed(0) +
                  summaryData.YieldTotal.u,
              },
              {
                key: t.frequency,
                value:
                  summaryData.Frequency.v.toFixed(1) + summaryData.Frequency.u,
              },
              {
                key: t.powerFactor,
                value:
                  summaryData.PowerFactor.v.toFixed(2) +
                  summaryData.PowerFactor.u,
              },
              {
                key: t.reactivePower,
                value:
                  summaryData.ReactivePower.v.toFixed(2) +
                  summaryData.ReactivePower.u,
              },
              {
                key: t.efficiency,
                value:
                  summaryData.Efficiency.v.toFixed(2) +
                  summaryData.Efficiency.u,
              },
            ]}
          />
        </VerticalView>
      )}
    </SimplePage>
  );
}
