import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import colors from "../misc/colors";

const Filter = ({onFilter }) => {
  return (
    <TouchableOpacity style={{ justifyContent: "center" }}>
      <Entypo name="select-arrows" size={35} onPress={onFilter}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

});

export default Filter;