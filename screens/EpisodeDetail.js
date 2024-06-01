import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import SearchBox from "../components/SearchBox";
import { useState } from "react";
import EpisodeComponent from "../components/EpisodeComponent";

const EpisodeDetailScreen = ({ route }) => {
  const { id, url, name, data } = route.params;
  console.log("Name: ", name);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="arrow-back-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <EpisodeComponent data={data} />
      </View>
    </View>
  );
};

export default EpisodeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    height: 60,
    width: "100%",
    backgroundColor: "#98cb53",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
  },
  titleContainer: {
    marginLeft: 8,
    height: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  bodyContainer: {},
});
