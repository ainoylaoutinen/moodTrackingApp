import React, { useState, useEffect } from "react";
import { Calendar } from "react-native-calendars";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  Button,
} from "react-native";
import { getDatabase, set, ref, push, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { SelectList } from "react-native-dropdown-select-list";

const firebaseConfig = {
  apiKey: "AIzaSyCd0G6AFBNXCVri3rQMKI09WYhuI3dLkCQ",
  authDomain: "mood-e169b.firebaseapp.com",
  databaseURL:
    "https://mood-e169b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mood-e169b",
  storageBucket: "mood-e169b.appspot.com",
  messagingSenderId: "582505707015",
  appId: "1:582505707015:web:94abc1ba81ca5260221ca2",
  measurementId: "G-M021LDGZ02",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const CalendarView = () => {
  const [showModal, setShowModal] = useState(true);
  const [showMoodInput, setShowMoodInput] = useState(false);
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = React.useState([]);
  //selected represents mood

  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setItems([]);
      } else {
        setItems(Object.values(data));
      }
    });
  }, []);

  const saveMood = (selected, date) => {
    if (selected && date) {
      push(ref(database, "items/"), {
        selected: selected,
        date: date,
      });
    }
  };

  const moodOptions = [
    { key: "1", value: "very happy" },
    { key: "2", value: "happy" },
    { key: "3", value: "ok" },
    { key: "4", value: "mood swings" },
    { key: "5", value: "sad" },
    { key: "6", value: "very sad" },
  ];

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor: "black",
            borderRadius: 10,
            margin: 40,
            padding: 40,
            width: 200,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", frontSize: 22 }}>Show calendar</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showMoodInput}></Modal>
      <Modal visible={showModal} animationType="fade">
        <Calendar
          style={{ borderRadius: 10, elevation: 4, margin: 40 }}
          onDayPress={(dateString) => {
            setDate(dateString);
            setShowModal(true);
            setShowMoodInput(true);
          }}
          onMonthChange={() => {}}
          hideExtraDays={false}
        />
        <Text
          style={{
            marginBottom: "5%",
            fontSize: 20,
            alignItems: "center",
            fontFamily: "Cochin",
          }}
        >
          How are you today?
        </Text>
        <Text
          style={{
            marginBottom: "5%",
            fontSize: 15,
            alignItems: "center",
            fontFamily: "Cochin",
          }}
        >
          Please select only one mood per day.
        </Text>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={moodOptions}
          save="value"
        />
        <View style>
          <Button onPress={() => saveMood(selected, date)} title="Save" />
          <Text
            style={{
              marginTop: 5,
              fontSize: 20,
              alignItems: "center",
              fontFamily: "Cochin",
            }}
          >
            Past moods
          </Text>
        </View>
        <FlatList
          style={{
            marginTop: "5%",
            fontWeight: "bold",
          }}
          data={items}
          renderItem={({ item }) => (
            <View>
              <Text style={{ fontSize: 15, fontFamily: "Cochin" }}>
                {item.date.day}
                {"."}
                {item.date.month}
                {"."}
                {item.date.year}
                {" : "}
                {item.selected}
              </Text>
            </View>
          )}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 150,
  },
  input: {
    marginTop: 30,
    marginBottom: 5,
    width: 150,
    borderColor: "gray",
    borderWidth: 1,
  },
  buttons: {
    flexDirection: "row",
    backgroundColor: "#ADD8E6",
    marginTop: 40,
  },
});

export default CalendarView;
