import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createNavigationContainerRef } from "@react-navigation/native";

export let isHome = false;

const Header = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <Text>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    width: "100%",
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 8,
  },
});
