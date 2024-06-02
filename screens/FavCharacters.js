import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FavCharactersScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: insets.top }]}>
        <Text style={styles.title}>Favourite Characters</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text>FavCharactersScreen</Text>
      </View>
    </View>
  );
};

export default FavCharactersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    height: 60,
    width: "100%",
    backgroundColor: "#98cb53",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  titleContainer: {
    height: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  bodyContainer: {
    flex: 1,
  },
});
