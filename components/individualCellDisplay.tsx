import { useData } from "@/contexts/dataProvider";
import { useSettings } from "@/contexts/settingsContext";
import { CELL_SIZE_PX, CellConfig, CellPosition } from "@/types/SolarLayout";
import React from "react";
import { View } from "react-native";
import SimpleText from "./simpleText";
import Compass from "./compass";
import { formatNumber } from "@/helper/formatHelper";

export default function IndividualCellDisplay() {
  const data = useData();
  const { solarLayout } = useSettings();

  const dcCells = data.liveSolarData?.inverters[0].DC;

  const makeCell = (cell: CellConfig, key: number) => {
    if (!dcCells || dcCells[cell.dcIndex] === undefined) return null;
    const cellData = dcCells[cell.dcIndex];
    const px = CELL_SIZE_PX[cell.size];
    const irradiation = cellData.Irradiation?.v ?? 0;
    const fontSize = Math.max(10, Math.round(px * 0.16));
    const labelSize = Math.max(7, Math.round(px * 0.09));

    return (
      <View
        key={key}
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderColor: "white",
          borderWidth: 2,
          width: px,
          height: px,
          margin: 6,
          backgroundColor: "#7079d1ff",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            borderEndEndRadius: 8,
            borderStartEndRadius: 8,
            height: `${irradiation}%`,
            width: "100%",
            backgroundColor: "#ffc400ff",
          }}
        />
        <SimpleText
          fontsize={fontSize}
          style={{ color: "black", fontWeight: "bold" }}
        >
          {formatNumber(cellData.Power.v, 1, "W")}
        </SimpleText>
        <SimpleText
          fontsize={labelSize}
          style={{
            position: "absolute",
            bottom: 4,
            color: "black",
            fontWeight: "bold",
          }}
        >
          {cellData.name.u}
        </SimpleText>
      </View>
    );
  };

  const cellsAt = (pos: CellPosition) =>
    solarLayout.cells.filter((c) => c.position === pos);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        {/* North row */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {cellsAt("N").map((cell, i) => makeCell(cell, i))}
        </View>

        {/* Middle: W | Compass | E */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            {cellsAt("W").map((cell, i) => makeCell(cell, i))}
          </View>

          <Compass rotation={solarLayout.compassRotation} />

          <View style={{ flexDirection: "column", alignItems: "center" }}>
            {cellsAt("E").map((cell, i) => makeCell(cell, i))}
          </View>
        </View>

        {/* South row */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          {cellsAt("S").map((cell, i) => makeCell(cell, i))}
        </View>
      </View>
    </View>
  );
}
