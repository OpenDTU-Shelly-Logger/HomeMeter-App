import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Clipboard,
} from "react-native";
import SimpleText from "./simpleText";
import { useSettings } from "@/contexts/settingsContext";
import { useData } from "@/contexts/dataProvider";
import { useTheme } from "@/hooks/useTheme";
import {
  CellConfig,
  CellPosition,
  CellSize,
  encodeSolarLayout,
  decodeSolarLayout,
} from "@/types/SolarLayout";
import { useTranslations } from "@/locales";

const POSITIONS: CellPosition[] = ["N", "S", "E", "W"];
const SIZES: { label: string; value: CellSize }[] = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
];

export default function CellLayoutConfig() {
  const { solarLayout, setSolarLayout } = useSettings();
  const data = useData();
  const colors = useTheme();
  const t = useTranslations();

  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState(false);

  const dcCells = data.liveSolarData?.inverters[0].DC;

  const getCellName = (index: number): string => {
    if (dcCells && dcCells[index]) {
      const name = dcCells[index].name.u;
      if (name && name !== "-" && name !== "Leer") return name;
    }
    return `Input ${index}`;
  };

  const updateCell = (i: number, patch: Partial<CellConfig>) => {
    const cells = [...solarLayout.cells];
    cells[i] = { ...cells[i], ...patch };
    setSolarLayout({ ...solarLayout, cells });
  };

  const removeCell = (i: number) => {
    const cells = solarLayout.cells.filter((_, idx) => idx !== i);
    setSolarLayout({ ...solarLayout, cells });
  };

  const addCell = () => {
    const usedIndices = new Set(solarLayout.cells.map((c) => c.dcIndex));
    const nextIndex = [0, 1, 2, 3, 4, 5, 6, 7].find((i) => !usedIndices.has(i));
    if (nextIndex === undefined) return;
    setSolarLayout({
      ...solarLayout,
      cells: [
        ...solarLayout.cells,
        { dcIndex: nextIndex, position: "S", size: "M" },
      ],
    });
  };

  const adjustRotation = (delta: number) => {
    const newRot = (((solarLayout.compassRotation + delta) % 360) + 360) % 360;
    setSolarLayout({ ...solarLayout, compassRotation: newRot });
  };

  const exportCode = encodeSolarLayout(solarLayout);

  const handleImport = () => {
    const result = decodeSolarLayout(importText.trim());
    if (result) {
      setSolarLayout(result);
      setImportText("");
      setImportError(false);
    } else {
      setImportError(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* ── Compass rotation ──────────────────────────────── */}
      <SimpleText style={styles.sectionLabel}>{t.compassRotation}</SimpleText>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.stepButton, { backgroundColor: colors.containerBG }]}
          onPress={() => adjustRotation(-5)}
        >
          <SimpleText style={styles.stepText}>-5°</SimpleText>
        </TouchableOpacity>
        <SimpleText style={[styles.rotValue, { color: colors.text }]}>
          {Math.round(solarLayout.compassRotation)}°
        </SimpleText>
        <TouchableOpacity
          style={[styles.stepButton, { backgroundColor: colors.containerBG }]}
          onPress={() => adjustRotation(5)}
        >
          <SimpleText style={styles.stepText}>+5°</SimpleText>
        </TouchableOpacity>
      </View>

      {/* ── Cell list ─────────────────────────────────────── */}
      <SimpleText style={styles.sectionLabel}>{t.solarLayout}</SimpleText>
      {solarLayout.cells.map((cell, i) => (
        <View
          key={i}
          style={[styles.cellRow, { backgroundColor: colors.containerBG }]}
        >
          {/* Header */}
          <View style={styles.cellHeader}>
            <SimpleText style={styles.cellTitle}>
              {getCellName(cell.dcIndex)} (#{cell.dcIndex})
            </SimpleText>
            <TouchableOpacity onPress={() => removeCell(i)}>
              <SimpleText style={{ color: "tomato", fontSize: 18 }}>
                ✕
              </SimpleText>
            </TouchableOpacity>
          </View>

          {/* DC input index */}
          <SimpleText style={styles.subLabel}>{t.panelIndex}</SimpleText>
          <View style={styles.chipRow}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      cell.dcIndex === idx ? colors.accent : colors.background,
                    borderColor: colors.accent,
                  },
                ]}
                onPress={() => updateCell(i, { dcIndex: idx })}
              >
                <SimpleText
                  fontsize={13}
                  style={{
                    color:
                      cell.dcIndex === idx ? colors.background : colors.text,
                    fontWeight: "bold",
                  }}
                >
                  {idx}
                </SimpleText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Position */}
          <SimpleText style={styles.subLabel}>{t.position}</SimpleText>
          <View style={styles.chipRow}>
            {POSITIONS.map((pos) => (
              <TouchableOpacity
                key={pos}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      cell.position === pos ? colors.accent : colors.background,
                    borderColor: colors.accent,
                  },
                ]}
                onPress={() => updateCell(i, { position: pos })}
              >
                <SimpleText
                  fontsize={14}
                  style={{
                    color:
                      cell.position === pos ? colors.background : colors.text,
                    fontWeight: "bold",
                  }}
                >
                  {pos}
                </SimpleText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Size */}
          <SimpleText style={styles.subLabel}>{t.size}</SimpleText>
          <View style={styles.chipRow}>
            {SIZES.map((s) => (
              <TouchableOpacity
                key={s.value}
                style={[
                  styles.chip,
                  {
                    backgroundColor:
                      cell.size === s.value ? colors.accent : colors.background,
                    borderColor: colors.accent,
                  },
                ]}
                onPress={() => updateCell(i, { size: s.value })}
              >
                <SimpleText
                  fontsize={14}
                  style={{
                    color:
                      cell.size === s.value ? colors.background : colors.text,
                    fontWeight: "bold",
                  }}
                >
                  {s.label}
                </SimpleText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {solarLayout.cells.length < 8 && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.accent }]}
          onPress={addCell}
        >
          <SimpleText
            style={{ color: colors.background, fontWeight: "bold" }}
            fontsize={15}
          >
            + {t.addPanel}
          </SimpleText>
        </TouchableOpacity>
      )}

      {/* ── Export ────────────────────────────────────────── */}
      <SimpleText style={styles.sectionLabel}>{t.exportLayout}</SimpleText>
      <TouchableOpacity
        style={[styles.codeBox, { backgroundColor: colors.containerBG }]}
        onPress={() => Clipboard.setString(exportCode)}
        activeOpacity={0.7}
      >
        <SimpleText
          selectable
          fontsize={11}
          style={{ fontFamily: "monospace" }}
        >
          {exportCode}
        </SimpleText>
      </TouchableOpacity>
      <SimpleText fontsize={11} style={{ opacity: 0.5, marginBottom: 4 }}>
        (tap to copy)
      </SimpleText>

      {/* ── Import ────────────────────────────────────────── */}
      <SimpleText style={styles.sectionLabel}>{t.importLayout}</SimpleText>
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.containerBG,
            borderColor: importError ? "tomato" : colors.containerBG,
          },
        ]}
        value={importText}
        onChangeText={(v) => {
          setImportText(v);
          setImportError(false);
        }}
        placeholder={t.layoutCode}
        placeholderTextColor={colors.text + "80"}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {importError && (
        <SimpleText fontsize={12} style={{ color: "tomato", marginBottom: 4 }}>
          {t.invalidLayoutCode}
        </SimpleText>
      )}
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: colors.containerBG }]}
        onPress={handleImport}
      >
        <SimpleText
          style={{ color: colors.text, fontWeight: "bold" }}
          fontsize={15}
        >
          {t.applyLayout}
        </SimpleText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", paddingHorizontal: 4 },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  stepText: { fontWeight: "bold", fontSize: 14 },
  rotValue: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 56,
    textAlign: "center",
  },
  cellRow: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  cellHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cellTitle: { fontWeight: "bold", fontSize: 14 },
  subLabel: { fontSize: 11, opacity: 0.6, marginTop: 8, marginBottom: 4 },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 34,
    alignItems: "center",
  },
  actionButton: {
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 4,
  },
  codeBox: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  input: {
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    borderWidth: 1.5,
    marginBottom: 6,
  },
});
