import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Diary from "./src/components/diary";
import Statistics from "./src/components/statistics";
import CalendarView from "./src/components/calendar";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Statistics") {
              iconName = "md-bar-chart";
            } else if (route.name === "Diary") {
              iconName = "md-pencil";
            } else if (route.name === "CalendarView") {
              iconName = "md-calendar";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Statistics" component={Statistics} />
        <Tab.Screen name="Calendar" component={CalendarView} />
        <Tab.Screen name="Diary" component={Diary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
