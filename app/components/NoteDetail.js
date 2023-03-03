import React, { useState, useEffect,useRef } from "react";
import { ScrollView, StyleSheet, Text, View, Alert,Dimensions } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../contexts/NoteProvider";
import NoteInputModal from "./NoteInputModal";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

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

const NoteDetail = (props) => {
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const { setNotes } = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [textNotify, setTextNotify] = useState("");
  const richText = useRef();
  const height_window = Dimensions.get('window').height - 160

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are You Sure!",
      "This action will delete your note permanently!",
      [
        {
          text: "Delete",
          onPress: deleteNote,
        },
        {
          text: "No Thanks",
          onPress: () => console.log("no thanks"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("notes");
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter((n) => {
      if (n.id === note.id) {
        n.title = title;
        n.desc = desc;
        n.isUpdated = true;
        n.time = time;
        contentNotify(n);
        setNote(n);
      }
      return n;
    });

    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };
  const contentNotify = (n) => {
    const date = n.date;
    if (date) {
      const newDate = new Date(date);
      let fDate =
        newDate.getDate() +
        "/" +
        (newDate.getMonth() + 1) +
        "/" +
        newDate.getFullYear();
      let fTime = newDate.getHours() + ":" + newDate.getMinutes();
      setTextNotify(fTime + " - " + fDate);
    }
  };

  const extractImageSource = (htmlString) => {
    const regex = /<img.*?src="(.*?)"/; 
    const match = regex.exec(htmlString);
    if (match && match[1]) {
      return match[1]; 
    }
    return null;
  };

  const imageSource = extractImageSource(note.desc);

  useEffect(() => {
    contentNotify(note);
    console.log(1);
  }, []);

  const styleEditor = {
    backgroundColor: note.color,
  };
  useEffect(() => {
    contentNotify(note);
    console.log(1);
  }, []);
  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
      >
        <Text style={styles.time}>
          {note.isUpdated
            ? `Updated At ${formatDate(note.time)}`
            : `Created At ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        {/* <Text style={styles.desc}>{note.desc}</Text> */}
        <ScrollView style={{backgroundColor: note.color}}>
          <RichEditor
            ref={richText}
            initialContentHTML={note.desc}
            style={styles.richTextEditorStyle}
            initialHeight={height_window}
            insertImage= {imageSource}
            allowFileAccess={true}
            editorStyle = {styleEditor}
            disabled={true}
          />
        </ScrollView>

        {textNotify && (
          <Text style={styles.btnNotifys}>Notify: {textNotify}</Text>
        )}
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn antIconName="edit" onPress={openEditModal} />
      </View>
      <NoteInputModal
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 50,
  },
  btnNotifys: {
    fontWeight: "bold",
    textAlign: "right",
    color: "#888",
  },
});

export default NoteDetail;
