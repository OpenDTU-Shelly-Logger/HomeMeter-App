import { useTheme } from "@/hooks/useTheme";
import SimpleModalBottomFlyout from "@/components/simpleModalBottomFlyout";
import SimplePage from "@/components/simplePage";
import SimpleText from "@/components/simpleText";
import SingleValueBox from "@/components/singleValueBox";
import { useData } from "@/contexts/dataProvider";
import { useTranslations } from "@/locales";
import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { DailySolarData } from "@/types/SolarHistory";
import { dateItemToString } from "@/types/DateItem";
import { formatNumber } from "@/helper/formatHelper";

export default function SolarTable() {
  const data = useData();
  const colors = useTheme();
  const t = useTranslations();

  const [modalItem, setModalItem] = useState<DailySolarData | null>(null);

  const showModal = (item: DailySolarData) => setModalItem(item);

  const renderItem = (item: DailySolarData, index: number) => (
    <TouchableOpacity
      onPress={() => showModal(item)}
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 8,
        borderRadius: 10,
        backgroundColor: index % 2 === 0 ? colors.background : colors.accent2,
      }}
    >
      <SimpleText style={styles.text}>{dateItemToString(item.date)}</SimpleText>
      <SimpleText style={styles.text}>
        {formatNumber(item.yieldTotal, 1)}
      </SimpleText>
      <SimpleText style={styles.text}>
        {formatNumber(item.yieldDay, 0)}
      </SimpleText>
      <SimpleText style={styles.text}>
        {formatNumber(item.highestWatt, 0)}
      </SimpleText>
      <SimpleText style={styles.text}>
        {formatNumber(item.temperature, 0)}
      </SimpleText>
    </TouchableOpacity>
  );

  return (
    <SimplePage
      enableScroll={false}
      headline={t.solarHistory}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <SimpleText style={styles.textHeadline}>{t.date}</SimpleText>
        <SimpleText style={styles.textHeadline}>{t.total}</SimpleText>
        <SimpleText style={styles.textHeadline}>{t.today}</SimpleText>
        <SimpleText style={styles.textHeadline}>{t.peak}</SimpleText>
        <SimpleText style={styles.textHeadline}>{t.temp}</SimpleText>
      </View>

      <SimpleModalBottomFlyout
        isVisible={modalItem != null}
        dismissed={() => setModalItem(null)}
      >
        {modalItem && (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 5,
            }}
          >
            <SimpleText style={{ fontSize: 24, fontWeight: "bold" }}>
              {t.dataFrom} {dateItemToString(modalItem.date)}
            </SimpleText>

            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline={t.yield}
              value={"+" + formatNumber(modalItem.yieldDay, 0, "Wh")}
            />
            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline={`${t.peak} Watt (${modalItem.timeHighestWatt})`}
              value={formatNumber(modalItem.highestWatt, 0, "W")}
            />
            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline={`${t.highestTemperature} (${modalItem.timeHighestTemp})`}
              value={formatNumber(modalItem.temperature, 0, "°C")}
            />

            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 10,
              }}
            />

            {modalItem.consumedWH && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={t.houseConsumption}
                value={formatNumber(modalItem.consumedWH, 0, "Wh")}
              />
            )}
            {modalItem.exportedWH && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={t.gridFeedIn}
                value={formatNumber(modalItem.exportedWH, 0, "Wh")}
              />
            )}
            {modalItem.selfUsedWH && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={t.usedSolarPower}
                value={formatNumber(modalItem.selfUsedWH, 0, "Wh")}
              />
            )}
            {modalItem.selfConsumptionRatio && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={t.selfConsumptionRate}
                value={formatNumber(
                  modalItem.selfConsumptionRatio * 100,
                  0,
                  "%",
                )}
              />
            )}
            {modalItem.autarkyRatio && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={t.autarkyRate}
                value={formatNumber(modalItem.autarkyRatio * 100, 0, "%")}
              />
            )}
          </View>
        )}
      </SimpleModalBottomFlyout>

      <FlatList
        style={{ padding: "5%" }}
        data={data.historyData.toReversed()}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item, i) => i.toString()}
      />
    </SimplePage>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  textHeadline: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
