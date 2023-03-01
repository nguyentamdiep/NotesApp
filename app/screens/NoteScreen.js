import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Note from "../components/Note";
import NoteInputModal from "../components/NoteInputModal";
import NotFound from "../components/NotFound";
import RoundIconBtn from "../components/RoundIconBtn";
import SearchBar from "../components/SearchBar";
import { useNotes } from "../contexts/NoteProvider";
import colors from "../misc/colors";

import ColorPaletteIconBtn from "../components/ColorPaletteIconBtn";
import ColorPaletteModal from "../components/ColorPaletteModal";
import Filter from "../components/Filter";
var temp = 1;
const reverseData = (data) => {
  if (temp % 2 == 0) {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt < bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt > bInt) return -1;
    });
  } else {
    return data.sort((a, b) => {
      const aInt = parseInt(a.time);
      const bInt = parseInt(b.time);
      if (aInt > bInt) return 1;
      if (aInt == bInt) return 0;
      if (aInt < bInt) return -1;
    });
  }
};
const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);

  const [colorPaletteModalVisible, setColorPaletteModalVisible] =
    useState("false");
  const [colorNote, setColorNote] = useState("");
  const [backgroundColor, setBackGroundColor] = useState("");
  const { notes, setNotes, findNotes } = useNotes();

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseNotes = reverseData(notes);

  const handleOnSubmit = async (title, desc) => {
    const note = { id: Date.now(), title, desc, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const handleOnSelect = async (color, backgroundSelected) => {
    if (backgroundSelected === false) {
      setColorNote(color);
      await AsyncStorage.setItem("colornote", JSON.stringify(color));
    } else {
      setBackGroundColor(color);
      await AsyncStorage.setItem("backgroundcolor", JSON.stringify(color));
    }

    //  console.log('luu backgroundcolor thanh cong')
  };
  const getColorNote = async () => {
    try {
      const color = await AsyncStorage.getItem("colornote");
      if (color !== null) {
        // value previously stored
        setColorNote(JSON.parse(color));
        //  console.log('read background color thanh cong')
        // console.log(backgroundColor);
      }
    } catch {
      // error reading value
      //return '';
      console.log("read colornote that bai");
    }
  };

  const getBackGroundColor = async () => {
    try {
      const color = await AsyncStorage.getItem("backgroundcolor");
      if (color !== null) {
        // value previously stored
        setBackGroundColor(JSON.parse(color));
        //  console.log('read background color thanh cong')
        // console.log(backgroundColor);
      }
    } catch {
      // error reading value
      //return '';
      console.log("read colornote that bai");
    }
  };
  useEffect(() => {
    getColorNote();
    getBackGroundColor();
  }, []);

  const openNote = (note) => {
    navigation.navigate("NoteDetail", { note });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter((note) => {
      if (
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.desc.toLowerCase().includes(text.toLowerCase())
      ) {
        return note;
      }
    });

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findNotes();
  };

  const handleFilter = async () => {
    temp++;
    await findNotes();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.PRIMARY} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            { backgroundColor: backgroundColor || "white" },
          ]}
        >
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>

          <View style={{ flexDirection: "row" }}>
            {notes.length ? (
              <SearchBar
                value={searchQuery}
                onChangeText={handleOnSearchInput}
                containerStyle={{ marginVertical: 15 }}
                onClear={handleOnClear}
              />
            ) : null}
  
              <Filter onFilter={handleFilter} />
            
          </View>
          {/* {notes.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />



          ) : null} */}

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              data={reverseNotes}
              numColumns={1}
              // columnWrapperStyle={{
              //    justifyContent: 'center',
              //   marginBottom: 15,
              // }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Note
                  backgroundColor={colorNote}
                  onPress={() => openNote(item)}
                  item={item}
                />
              )}
            />
          )}

          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.btnContainer}>
        <RoundIconBtn
          onPress={() => setModalVisible(true)}
          antIconName="plus"
          //style={styles.addBtn}
          style={{ marginBottom: 15 }}
        />

        <ColorPaletteIconBtn
          onPress={() => {
            setColorPaletteModalVisible(true);
          }}
          ionIconName="color-palette-outline"
          //style={styles.addBtn}
          style={{ marginBottom: 15 }}
        />
      </View>

      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />

      <ColorPaletteModal
        visible={colorPaletteModalVisible}
        onClose={() => setColorPaletteModalVisible(false)}
        onSelect={handleOnSelect}
        //  onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },
  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 1,
  },

  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
    zIndex: 1,
  },
});

export default NoteScreen;
