import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const SearchBox = ({ searchQuery, handleSearch }) => {
  return (
    <TextInput
      placeholder="Search"
      clearButtonMode="always"
      style={styles.searchBox}
      autoCapitalize="none"
      autoCorrect={false}
      value={searchQuery}
      onChangeText={(query) => handleSearch(query)}
    />
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
});
