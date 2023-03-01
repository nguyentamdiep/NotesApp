import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colors from "../misc/colors";
import RoundIconBtn from "./RoundIconBtn";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Alarm from "./Alarm";
const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("datetime");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [isalarms, setIsAlarms] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const handleModalClose = () => {
    Keyboard.dismiss();
  };
  function onChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS == "ios");
    setDate(currentDate);
    if (selectedDate) {
      if (selectedDate < new Date()) {
        selectedDate = new Date();
        Alert.alert("Please select a future date and time");
      }
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        "/" +
        (tempDate.getMonth() + 1) +
        "/" +
        tempDate.getFullYear();
      let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
      setText(fDate + " - " + fTime);
      setDateTime(selectedDate);
    }
  }
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const handleOnPressAlarm = () => {
    Keyboard.dismiss();
    setIsAlarms(true);
    setDate(date || new Date());
  };
  useEffect(() => {
    if (isEdit) {
      setTitle(note.title);
      setDesc(note.desc);
    }
    console.log("one");
    const getPermission = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Enable push notifications to use the app!");
          await AsyncStorage.setItem("expopushtoken", "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await AsyncStorage.setItem("expopushtoken", token);
      } else {
        alert("Must use physical device for Push Notifications");
      }
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };
    getPermission();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [isEdit]);
  async function scheduleNotification() {
    setIsAlarms(false);
    setDate(date);
    // Set up the notification payload
    let notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: `You have a reminder for the note `,
      },
      trigger: {
        seconds: Math.floor((dateTime.getTime() - Date.now()) / 1000),
      },
    });

    Alert.alert("Scheduled notification with id:", notificationId);
  }

  const handleOnClose = () => {
    setDate(date), setIsAlarms(false);
  };
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            value={title}
            onChangeText={(text) => handleOnChangeText(text, "title")}
            placeholder="Title"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            multiline
            placeholder="Note"
            style={[styles.input, styles.desc]}
            onChangeText={(text) => handleOnChangeText(text, "desc")}
          />
          {isalarms && (
            <Alarm
              date={date}
              onClickDate={() => showMode("date")}
              onClickTime={() => showMode("time")}
              onSubmit={scheduleNotification}
              onClose={handleOnClose}
            />
          )}

          <View style={styles.btnContainer}>
            <RoundIconBtn
              antIconName="clockcircle"
              size={15}
              onPress={handleOnPressAlarm}
            />
            <RoundIconBtn
              size={15}
              style={{ marginLeft: 15 }}
              antIconName="check"
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    //alignItems:'flex-start',
    //marginStart: 10,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },
  desc: {
    height: "60%",
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
  alarms: {
    position: "relative",
    bottom: 0,
    zIndex: 1,
    width: 54,
    maxHeight: 54,
    color: colors.DARK,
    backgroundColor: "gray",
  },
});

export default NoteInputModal;
