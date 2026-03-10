import SectionHeadline from "@/components/sectionHeadline";
import SimpleKeyValueBox from "@/components/simpleKeyValueBox";
import SimplePage from "@/components/simplePage";
import SimpleText from "@/components/simpleText";
import SingleValueBox from "@/components/singleValueBox";
import VerticalView from "@/components/verticalView";
import { useData } from "@/contexts/dataProvider";
import { formatNumber } from "@/helper/formatHelper";
import { useTranslations } from "@/locales";
import React from "react";

export default function SolarOverview() {
  const data = useData();
  const t = useTranslations();

  const summaryData = data.liveSolarData?.inverters[0].AC[0];
  const latestHistory = data.historyData[data.historyData.length - 1];

  return (
    <SimplePage headline={t.solar} enableScroll={true}>
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        <SingleValueBox
          headline={t.totalYield}
          value={formatNumber(
            data.liveSolarData?.total.YieldTotal.v,
            1,
            data.liveSolarData?.total.YieldTotal.u,
          )}
        />
        <SingleValueBox
          headline={t.yieldToday}
          value={formatNumber(
            data.liveSolarData?.total.YieldDay.v,
            0,
            data.liveSolarData?.total.YieldDay.u,
          )}
        />
        <SingleValueBox
          headline={t.currentPower}
          value={formatNumber(
            data.liveSolarData?.total.Power.v,
            2,
            data.liveSolarData?.total.Power.u,
          )}
        />
        <SingleValueBox
          headline={t.peak}
          value={formatNumber(latestHistory?.highestWatt, 1, "W")}
        />
        <SingleValueBox
          headline={t.temperature}
          value={formatNumber(latestHistory?.temperature, 1, "°C")}
        />
      </VerticalView>

      <SectionHeadline text={t.solarPanels} />
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        {data.liveSolarData?.inverters[0].DC &&
          Object.values(data.liveSolarData.inverters[0].DC).map(
            (value, index) => {
              if (value.name.u !== "-" && value.name.u !== "Leer") {
                return (
                  <SimpleKeyValueBox
                    headline={value.name.u}
                    key={index}
                    data={[
                      {
                        key: t.power,
                        value: formatNumber(value.Power.v, 1, value.Power.u),
                      },
                      {
                        key: t.voltage,
                        value: formatNumber(
                          value.Voltage.v,
                          1,
                          value.Voltage.u,
                        ),
                      },
                      {
                        key: t.current,
                        value: formatNumber(
                          value.Current.v,
                          1,
                          value.Current.u,
                        ),
                      },
                      {
                        key: t.dailyYield,
                        value: formatNumber(
                          value.YieldDay.v,
                          0,
                          value.YieldDay.u,
                        ),
                      },
                      {
                        key: t.totalYield,
                        value: formatNumber(
                          value.YieldTotal.v,
                          0,
                          value.YieldTotal.u,
                        ),
                      },
                      {
                        key: t.irradiation,
                        value: formatNumber(
                          value.Irradiation?.v,
                          0,
                          value.Irradiation?.u ?? "",
                        ),
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
                value: formatNumber(
                  summaryData.Power.v,
                  2,
                  summaryData.Power.u,
                ),
              },
              {
                key: t.voltage,
                value: formatNumber(
                  summaryData.Voltage.v,
                  2,
                  summaryData.Voltage.u,
                ),
              },
              {
                key: t.current,
                value: formatNumber(
                  summaryData.Current.v,
                  2,
                  summaryData.Current.u,
                ),
              },
              {
                key: t.dailyYield,
                value: formatNumber(
                  summaryData.YieldDay.v,
                  0,
                  summaryData.YieldDay.u,
                ),
              },
              {
                key: t.totalYield,
                value: formatNumber(
                  summaryData.YieldTotal.v,
                  0,
                  summaryData.YieldTotal.u,
                ),
              },
              {
                key: t.frequency,
                value: formatNumber(
                  summaryData.Frequency.v,
                  1,
                  summaryData.Frequency.u,
                ),
              },
              {
                key: t.powerFactor,
                value: formatNumber(
                  summaryData.PowerFactor.v,
                  2,
                  summaryData.PowerFactor.u,
                ),
              },
              {
                key: t.reactivePower,
                value: formatNumber(
                  summaryData.ReactivePower.v,
                  2,
                  summaryData.ReactivePower.u,
                ),
              },
              {
                key: t.efficiency,
                value: formatNumber(
                  summaryData.Efficiency.v,
                  2,
                  summaryData.Efficiency.u,
                ),
              },
            ]}
          />
        </VerticalView>
      )}
    </SimplePage>
  );
}
