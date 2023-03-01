import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../misc/colors";

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.searchBar}
          placeholder="Search here.."
        />
        {value ? (
          <AntDesign
            name="close"
            size={20}
            color={colors.PRIMARY}
            onPress={onClear}
            style={styles.clearIcon}
          />
        ) : null}
        {/* <TouchableOpacity>
          <AntDesign name="filter" size={35} style={{ marginLeft: 10 }} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: colors.DARK,
    height: 40,
    width: "90%",
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  container: {
    justifyContent: "center",
  },
  clearIcon: {
    position: "absolute",
    right: 40,
    alignSelf: 'center',
    color: 'black',
  },
});

export default SearchBar;


