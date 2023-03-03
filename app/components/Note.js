// import React from "react";
// import { useState,useEffect } from "react";
// import {
//   View,
//   StyleSheet,
//   Text,
//   Dimensions,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
// } from "react-native";
// import colors from "../misc/colors";
// import Icon from "react-native-vector-icons/FontAwesome";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const Note = ({ item, onPress, backgroundColor}) => {
//   const { title, desc } = item;
//   const [isFavorite, setIsFavorite] = useState(false);
//   // const onStarPress = async(isFavorite) => {
//   //   setIsFavorite(!isFavorite);
//   //   await AsyncStorage.setItem(!isFavorite)
//   // };
//   const onStarPress = async (isFavorite) => {
//     setIsFavorite(!isFavorite);
//     try {
//       await AsyncStorage.setItem('isFavorite', JSON.stringify(!isFavorite));
//     } catch (e) {
//       console.log('Error saving isFavorite', e);
//     }
//   };
//   const getIsFavorite = async () => {
//     try {
//       const value = await AsyncStorage.getItem('isFavorite');
//       if (value !== null) {
//         setIsFavorite(JSON.parse(value));
//       }
//     } catch (e) {
//       console.log('Error getting isFavorite', e);
//     }
//   };
  
//   // Gọi hàm getIsFavorite khi component được render
//   useEffect(() => {
//     getIsFavorite();
//   }, []);
  
//   return (
//     <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor:backgroundColor || colors.PRIMARY}]}>
//       <TouchableOpacity onPress={onStarPress}>
//         <Icon
//           name={isFavorite  ? 'star' : 'star-o'}
//           size={20}
//           color={isFavorite ? 'yellow' : 'white'}
//           style={styles.starIcon}
//         />
//       </TouchableOpacity>
//       <Text style={styles.title} numberOfLines={2}>
//         {title}
//       </Text>
//       <Text numberOfLines={3}>{desc}</Text>
//     </TouchableOpacity>
//   );
// };

// const width = Dimensions.get('window').width - 40;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: colors.PRIMARY,
//     //width: width / 2 - 10,
//     width: width - 10,
//     padding: 8,
//     borderRadius: 10,
//     marginBottom:10,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: colors.LIGHT,
//   },
//   starIcon: {
//     marginRight: 10,
//   },
// });


// export default Note;
import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Note = ({ item, onPress, backgroundColor }) => {
  const { title, desc, time, isUpdated } = item;
  const [isFavorite, setIsFavorite] = useState(false);

  // Lấy giá trị từ AsyncStorage khi component render
  useEffect(() => {
    const getFavoriteStatus = async () => {
      try {
        const favoriteStatus = await AsyncStorage.getItem(title);
        if (favoriteStatus !== null) {
          setIsFavorite(JSON.parse(favoriteStatus));
        }
      } catch (e) {
        console.log(e);
      }
    };

    getFavoriteStatus();
  }, []);

  // Lưu giá trị của biến isFavorite vào AsyncStorage khi nhấn vào icon
  const onStarPress = async () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    try {
      await AsyncStorage.setItem(title, JSON.stringify(newFavoriteStatus));
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (ms) => {
    const date = new Date(ms);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
  
    return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: backgroundColor || colors.PRIMARY }]}
    >
      <TouchableOpacity onPress={onStarPress}>
        <Icon
          name={isFavorite ? "star" : "star-o"}
          size={20}
          color={isFavorite ? "yellow" : "white"}
          style={styles.starIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={4}>{desc}</Text>
      <Text style = {styles.time}>
        {
          isUpdated 
          ? `Updated at ${formatDate(time)}`
          : `Created at ${formatDate(time)}`
        }
      </Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PRIMARY,
    width: width - 10,
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.LIGHT,
  },
  starIcon: {
    marginRight: 10,
  },

  time: {
   // textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },
});

export default Note;
