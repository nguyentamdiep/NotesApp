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

const Note = ({ item, onPress, backgroundColor,onStarPress,isStarred }) => {
  const { title, desc } = item;
  const [starredNotes, setStarredNotes] = useState([]);

  const toggleStar = (note) => {
    if (starredNotes.includes(note)) {
      setStarredNotes(starredNotes.filter((n) => n !== note));
    } else {
      setStarredNotes([...starredNotes, note]);
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor:backgroundColor || colors.PRIMARY}]}>
      <TouchableOpacity onPress={onStarPress}>
        <Icon
          name={isStarred ? 'star' : 'star-o'}
          size={20}
          color={isStarred ? 'yellow' : 'white'}
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
