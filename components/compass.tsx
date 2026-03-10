import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CompassProps {
  rotation?: number;
}

const Compass: React.FC<CompassProps> = ({ rotation = 0 }) => {
  return (
    <View style={[{ transform: [{ rotate: `${rotation}deg` }] }]}>
      <View style={styles.container}>
        <Text style={[styles.label, styles.north]}>N</Text>
        <Text style={[styles.label, styles.south]}>S</Text>
        <Text style={[styles.label, styles.west]}>W</Text>
        <Text style={[styles.label, styles.east]}>O</Text>
        <View style={styles.circle} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "#ffff",
  },
  label: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
  },
  north: {
    color: "white",
    top: 10,
    left: "50%",
    textAlign: "center",
    transform: [{ translateX: -6 }],
  },
  south: {
    transform: [{ translateX: -6 }],
    color: "white",
    bottom: 10,
    textAlign: "center",
    left: "50%",
  },
  west: {
    color: "white",
    left: 10,
    top: "50%",
    transform: [{ translateY: -14 }],
  },
  east: {
    color: "white",
    textAlign: "center",

    right: 10,
    top: "50%",
    transform: [{ translateY: -14 }],
  },
});

export default Compass;
