import VerticalView from "@/components/verticalView";
import SimpleBox from "@/components/simpleBox";
import SimplePage from "@/components/simplePage";
import SimpleText from "@/components/simpleText";
import SingleValueBox from "@/components/singleValueBox";
import React from "react";
import { View, Text } from "react-native";
import SimpleKeyValueBox from "@/components/simpleKeyValueBox";
import SectionHeadline from "@/components/sectionHeadline";
import { useData } from "@/contexts/dataProvider";

export default function PowerUsage() {
  const data = useData();

  return (
    <SimplePage headline="Verbrauch" enableScroll={true}>
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        <SingleValueBox
          headline="Aktuelle Einspeisung"
          value={data.livePowerData?.total_power.toFixed(2) + "W"}
        />
        <SingleValueBox
          headline="Solar Aktuell"
          value={
            "+" +
            (data.liveSolarData?.total.Power.v.toFixed(2) ?? "") +
            data.liveSolarData?.total.Power.u
          }
        />
        <SingleValueBox
          headline="Hausverbrauch"
          value={
            (
              (data.livePowerData?.total_power ?? 0) +
              (data.liveSolarData?.total.Power.v ?? 0)
            ).toFixed(2) + "W"
          }
        />
      </VerticalView>
      <SectionHeadline text="Phasen" />
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        {data.livePowerData?.emeters.map((emeter, index) => (
          <SimpleKeyValueBox
            headline={"Phase" + (index + 1)}
            key={index}
            data={[
              { key: "Leistung", value: emeter.power.toFixed(2) + "W" },
              { key: "Strom", value: emeter.current.toFixed(2) + "A" },
              { key: "Spannung", value: emeter.voltage.toFixed(2) + "V" },
            ]}
          />
        ))}
      </VerticalView>
    </SimplePage>
  );
}
