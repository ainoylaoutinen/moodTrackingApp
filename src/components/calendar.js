import React, { useState, useEffect } from "react";
import Mood from "./Mood";
import saveMood from "./saveMood";
import { Calendar } from "react-native-calendars";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import { ref, onValue } from "firebase/database";
import database from "./saveMood";

const CalendarView = ({ navigation }) => {
  const [showModal, setShowModal] = useState(true);
  const [showMoodInput, setShowMoodInput] = useState(false);
  const [mood, setMood] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]);

  console.log(items);

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
          //initialDate={"2022-02-11"}
          hideExtraDays={false}
          //markedDates={{
          //"2022-02-11": {
          //marked: true,
          //dotColor: "red",
          //selected: true,
          //selectedColor: "purple",
          //selectedTextColor: "white",
          //},
          //}}
        />
        <TextInput
          placeholder="how are you today?"
          style={{
            marginTop: 150,
            fontSize: 18,
            width: 200,
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={(mood) => setMood(mood)}
          value={mood}
        />
        <View style>
          <Button onPress={saveMood(mood, date)} title="Save" />
          <Text style={{ marginTop: 30, fontSize: 20 }}>Moods</Text>
        </View>
        <FlatList
          style={{ marginLeft: "5%" }}
          //keyExtractor={(item) => index.toString()}
          data={items}
          renderItem={({ item }) => (
            <View>
              <Text>
                {item.mood},{item.date}{" "}
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
