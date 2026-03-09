import { useTheme } from "@/hooks/useTheme";
import { PowerData } from "@/backend/powerDataParser";
import { DailySolarData, SolarData } from "@/backend/solarDataParser";
import SimpleBox from "@/components/simpleBox";
import SimpleModalBottomFlyout from "@/components/simpleModalBottomFlyout";
import SimplePage from "@/components/simplePage";
import SimpleText from "@/components/simpleText";
import SingleValueBox from "@/components/singleValueBox";
import { useData } from "@/contexts/dataProvider";
import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

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
      <SimpleText style={styles.text}>{item.Date}</SimpleText>
      <SimpleText style={styles.text}>{item.YieldTotal.toFixed(1)}</SimpleText>
      <SimpleText style={styles.text}>{item.YieldDay}</SimpleText>
      <SimpleText style={styles.text}>{item.HighestWatt.toFixed(0)}</SimpleText>
      <SimpleText style={styles.text}>{item.Temperature.toFixed(0)}</SimpleText>
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
              Daten vom {modalItem.Date}
            </SimpleText>
            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline="Ertrag"
              value={"+" + modalItem.YieldDay + " Wh"}
            />
            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline={`Peak Watt (${modalItem.TimeHighestWatt})`}
              value={modalItem.HighestWatt + " W"}
            />
            <SingleValueBox
              fontStyle={{ fontSize: 18 }}
              headline={`Höchste Temperatur (${modalItem.TimeHighestTemp})`}
              value={modalItem.Temperature + " °C"}
            />
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "gray",
                width: "100%",
                marginTop: 10,
              }}
            />

            {modalItem.ConsumedWH && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Hausverbrauch"}
                value={modalItem.ConsumedWH.toFixed(0) + " Wh"}
              />
            )}
            {modalItem.ExportedWH && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Netzeinspeisung"}
                value={modalItem.ExportedWH.toFixed(0) + " Wh"}
              />
            )}
            {modalItem.SelfUsedWH && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Umgesetzter Solarstrom"}
                value={modalItem.SelfUsedWH.toFixed(0) + " Wh"}
              />
            )}
            {modalItem.SelfConsumptionRatio && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Eigenverbrauchsquote"}
                value={(modalItem.SelfConsumptionRatio * 100).toFixed(0) + " %"}
              />
            )}
            {modalItem.AutarkyRatio && (
              <SingleValueBox
                fontStyle={{ fontSize: 18 }}
                headline={"Autarkiegrad"}
                value={(modalItem.AutarkyRatio * 100).toFixed(0) + " %"}
              />
            )}
          </View>
        )}
      </SimpleModalBottomFlyout>
      <FlatList
        style={{ padding: "5%" }}
        data={data.solarHistoryData.toReversed()}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item) => item.Date.toString()}
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
