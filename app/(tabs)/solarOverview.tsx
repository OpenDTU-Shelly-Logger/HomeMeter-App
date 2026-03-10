import SectionHeadline from "@/components/sectionHeadline";
import SimpleKeyValueBox from "@/components/simpleKeyValueBox";
import SimplePage from "@/components/simplePage";
import SimpleText from "@/components/simpleText";
import SingleValueBox from "@/components/singleValueBox";
import VerticalView from "@/components/verticalView";
import { useData } from "@/contexts/dataProvider";
import React from "react";

export default function SolarOverview() {
  const data = useData();

  const summaryData = data.liveSolarData?.inverters[0].AC[0];

  return (
    <SimplePage headline="Solar" enableScroll={true}>
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        <SingleValueBox
          headline="Gesamtertrag"
          value={
            (data.liveSolarData?.total.YieldTotal.v.toFixed(1) ?? "") +
            data.liveSolarData?.total.YieldTotal.u
          }
        />
        <SingleValueBox
          headline="Ertrag Heute"
          value={
            (data.liveSolarData?.total.YieldDay.v.toFixed(0) ?? "") +
            data.liveSolarData?.total.YieldDay.u
          }
        />
        <SingleValueBox
          headline="Aktuelle Leistung"
          value={
            (data.liveSolarData?.total.Power.v.toFixed(2) ?? "") +
            data.liveSolarData?.total.Power.u
          }
        />
        <SingleValueBox
          headline="Peak"
          value={
            (data.historyData[data.historyData.length - 1]?.highestWatt.toFixed(
              1,
            ) ?? "") + "W"
          }
        />
        <SingleValueBox
          headline="Temperatur"
          value={
            (data.historyData[data.historyData.length - 1]?.temperature.toFixed(
              1,
            ) ?? "") + "°C"
          }
        />
      </VerticalView>
      <SectionHeadline text="Solarzellen" />

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
                        key: "Leistung",
                        value: value.Power.v.toFixed(1) + value.Power.u,
                      },
                      {
                        key: "Spannung",
                        value: value.Voltage.v.toFixed(1) + value.Voltage.u,
                      },
                      {
                        key: "Strom",
                        value: value.Current.v.toFixed(1) + value.Current.u,
                      },
                      {
                        key: "Tagesertrag",
                        value: value.YieldDay.v.toFixed(0) + value.YieldDay.u,
                      },
                      {
                        key: "Gesamtertrag",
                        value:
                          value.YieldTotal.v.toFixed(0) + value.YieldTotal.u,
                      },
                      {
                        key: "Einstrahlung",
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
      <SectionHeadline text="Wechselrichter" />
      {summaryData && (
        <VerticalView
          style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
        >
          <SimpleKeyValueBox
            data={[
              {
                key: "Leistung",
                value: summaryData.Power.v.toFixed(2) + summaryData.Power.u,
              },
              {
                key: "Spannung",
                value: summaryData.Voltage.v.toFixed(2) + summaryData.Voltage.u,
              },
              {
                key: "Strom",
                value: summaryData.Current.v.toFixed(2) + summaryData.Current.u,
              },
              {
                key: "Tagesertrag",
                value: summaryData.YieldDay.v + summaryData.YieldDay.u,
              },
              {
                key: "Gesamtertrag",
                value:
                  summaryData.YieldTotal.v.toFixed(0) +
                  summaryData.YieldTotal.u,
              },
              {
                key: "Frequenz",
                value:
                  summaryData.Frequency.v.toFixed(1) + summaryData.Frequency.u,
              },
              {
                key: "Leistungsfaktor",
                value:
                  summaryData.PowerFactor.v.toFixed(2) +
                  summaryData.PowerFactor.u,
              },
              {
                key: "Blindleistung",
                value:
                  summaryData.ReactivePower.v.toFixed(2) +
                  summaryData.ReactivePower.u,
              },
              {
                key: "Wirkungsgrad",
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
