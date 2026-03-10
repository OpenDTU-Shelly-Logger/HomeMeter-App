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
import { useTranslations } from "@/locales";

export default function PowerUsage() {
  const data = useData();
  const t = useTranslations();

  return (
    <SimplePage headline={t.consumption} enableScroll={true}>
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        <SingleValueBox
          headline={t.currentFeedIn}
          value={data.livePowerData?.total_power.toFixed(2) + "W"}
        />
        <SingleValueBox
          headline={t.solarCurrent}
          value={
            "+" +
            (data.liveSolarData?.total.Power.v.toFixed(2) ?? "") +
            data.liveSolarData?.total.Power.u
          }
        />
        <SingleValueBox
          headline={t.houseConsumption}
          value={
            (
              (data.livePowerData?.total_power ?? 0) +
              (data.liveSolarData?.total.Power.v ?? 0)
            ).toFixed(2) + "W"
          }
        />
      </VerticalView>
      <SectionHeadline text={t.phases} />
      <VerticalView
        style={{ gap: 10, alignItems: "center", justifyContent: "center" }}
      >
        {data.livePowerData?.emeters.map((emeter, index) => (
          <SimpleKeyValueBox
            headline={t.phase + " " + (index + 1)}
            key={index}
            data={[
              { key: t.power, value: emeter.power.toFixed(2) + "W" },
              { key: t.current, value: emeter.current.toFixed(2) + "A" },
              { key: t.voltage, value: emeter.voltage.toFixed(2) + "V" },
            ]}
          />
        ))}
      </VerticalView>
    </SimplePage>
  );
}
