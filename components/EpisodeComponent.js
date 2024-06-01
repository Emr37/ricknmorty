import { View, Text, StyleSheet } from "react-native";
import React from "react";

const EpisodeComponent = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Session {data?.episode.split("S")[1].split("E")[0]}</Text>
        <Text style={styles.title}>Episode {data?.episode.split("S")[1].split("E")[1]}</Text>
      </View>

      <Text>Hello EpisodeComponent</Text>
      <Text>{data?.name}</Text>
    </View>
  );
};

export default EpisodeComponent;

const styles = StyleSheet.create({
  container: {
    height: "50%",
    width: "100%",
    backgroundColor: "cyan",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 12,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
});
