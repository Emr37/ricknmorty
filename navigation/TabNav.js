import { FavCharactersScreen, CharactersScreen, EpisodesScreen } from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dimensions } from "react-native";
import { useEffect, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get("window");

export const TabNav = () => {
  const navigation = useNavigation();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,

          tabBarStyle: {
            height: height / 15,
            backgroundColor: "#eee",
            //position: "absolute",
          },
        }}
        initialRouteName="Episodes"
      >
        <Tab.Screen
          name="Episodes"
          component={EpisodesScreen}
          options={{
            tabBarIcon: ({ focused }) => <Ionicons color={"#98cb53"} size={focused ? 36 : 24} name={focused ? "home" : "home-outline"} />,
          }}
        />
        <Tab.Screen
          name="Characters"
          component={CharactersScreen}
          options={{
            tabBarIcon: ({ focused }) => <Ionicons color={"#98cb53"} size={focused ? 36 : 24} name={focused ? "people" : "people-outline"} />,
          }}
        />
        <Tab.Screen
          name="FavCharacters"
          component={FavCharactersScreen}
          options={{
            tabBarIcon: ({ focused }) => <Ionicons color={"#98cb53"} size={focused ? 36 : 24} name={focused ? "star" : "star-outline"} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};
