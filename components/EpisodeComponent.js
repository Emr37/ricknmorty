import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import CharacterCard from "./CharacterCard";

const EpisodeComponent = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Session {data?.episode.split("S")[1].split("E")[0]}</Text>
        <Text style={styles.title}>Episode {data?.episode.split("S")[1].split("E")[1]}</Text>
      </View>
      <Text style={styles.title}>{data?.name}'s Characters</Text>
    </View>
  );
};

export default EpisodeComponent;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
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
  bodyContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "pink",
  },
});
