import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import database from "../../firebase";

export default function Mood(props) {
  //const [mood, setMood] = useState("");
  const moods = props.moods;
  const onSubmit = props.onSubmit;

  return (
    <View style={styles.container}>
      <Text>History:</Text>

      <FlatList
        style={styles.list}
        data={moods}
        renderItem={(item) => (
          <Text
            onPress={() => {
              setMood(item.item);
            }}
          >
            {item.item}
          </Text>
        )}
      />
      <TouchableOpacity
        onPress={() => {
          onSubmit(mood);
          setMood("");
        }}
        style={{
          backgroundColor: "black",
          borderRadius: 10,
          margin: 40,
          padding: 40,
          width: 200,
          alignItems: "center",
        }}
      ></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
