import app from "../../firebase";
import { getDatabase, set, ref, push, onValue } from "firebase/database";
import React, { useEffect } from "react";

export default function saveMood(mood, date) {
  const database = getDatabase(app);

  if (mood && date) {
    push(ref(database, "items/"), {
      mood: mood,
      date: date,
    });
  }
}
