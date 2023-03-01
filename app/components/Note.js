import React from "react";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../misc/colors";
import Icon from "react-native-vector-icons/FontAwesome";

const Note = ({ item, onPress, backgroundColor}) => {
  const { title, desc } = item;
  const [isFavorite, setIsFavorite] = useState(false);
  const onStarPress = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor:backgroundColor || colors.PRIMARY}]}>
      <TouchableOpacity onPress={onStarPress}>
        <Icon
          name={isFavorite ? 'star' : 'star-o'}
          size={20}
          color={isFavorite ? 'yellow' : 'white'}
          style={styles.starIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3}>{desc}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    //width: width / 2 - 10,
    width: width - 10,
    padding: 8,
    borderRadius: 10,
    marginBottom:10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.LIGHT,
  },
  starIcon: {
    marginRight: 10,
  },
});


export default Note;
