import { useTheme } from "@/hooks/useTheme";
import SimpleModalBottomFlyout from "@/components/simpleModalBottomFlyout";
import SimplePage from "@/components/simplePage";
import SimpleText from "@/components/simpleText";
import SingleValueBox from "@/components/singleValueBox";
import { useData } from "@/contexts/dataProvider";
import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { DailySolarData } from "@/types/SolarHistory";
import { dateItemToString } from "@/types/DateItem";

export default function SolarTable() {
  const data = useData();
  const colors = useTheme();

  const [modalItem, setModalItem] = useState<DailySolarData | null>(null);

  const showModal = (item: DailySolarData) => {
    setModalItem(item);
  };

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
        backgroundColor: index % 2 == 0 ? colors.background : colors.accent2,
      }}
    >
      <SimpleText style={styles.text}>{dateItemToString(item.date)}</SimpleText>
      <SimpleText style={styles.text}>{item.yieldTotal.toFixed(1)}</SimpleText>
      <SimpleText style={styles.text}>{item.yieldDay}</SimpleText>
      <SimpleText style={styles.text}>{item.highestWatt.toFixed(0)}</SimpleText>
      <SimpleText style={styles.text}>{item.temperature.toFixed(0)}</SimpleText>
    </TouchableOpacity>
  );

  return (
    <SimplePage
      enableScroll={false}
      headline="Solar Verlauf"
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
        <SimpleText style={styles.textHeadline}>Datum</SimpleText>
        <SimpleText style={styles.textHeadline}>Gesamt</SimpleText>
        <SimpleText style={styles.textHeadline}>Heute</SimpleText>
        <SimpleText style={styles.textHeadline}>Peak</SimpleText>
        <SimpleText style={styles.textHeadline}>Temp</SimpleText>
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
              Daten vom {dateItemToString(modalItem.date)}
            </SimpleText>
            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline="Ertrag"
              value={"+" + modalItem.yieldDay + " Wh"}
            />
            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline={`Peak Watt (${modalItem.timeHighestWatt})`}
              value={modalItem.highestWatt + " W"}
            />
            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline={`Höchste Temperatur (${modalItem.timeHighestTemp})`}
              value={modalItem.temperature + " °C"}
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
                headline={"Hausverbrauch"}
                value={modalItem.consumedWH.toFixed(0) + " Wh"}
              />
            )}
            {modalItem.exportedWH && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Netzeinspeisung"}
                value={modalItem.exportedWH.toFixed(0) + " Wh"}
              />
            )}
            {modalItem.selfUsedWH && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Umgesetzter Solarstrom"}
                value={modalItem.selfUsedWH.toFixed(0) + " Wh"}
              />
            )}
            {modalItem.selfConsumptionRatio && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Eigenverbrauchsquote"}
                value={(modalItem.selfConsumptionRatio * 100).toFixed(0) + " %"}
              />
            )}
            {modalItem.autarkyRatio && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Autarkiegrad"}
                value={(modalItem.autarkyRatio * 100).toFixed(0) + " %"}
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
