import React, { useState, useEffect, useContext, useRef } from "react";
import { Platform, Alert } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../components/Splash";
import { CharactersScreen, CharacterDetailScreen, EpisodesScreen, EpisodeDetailScreen, FavCharactersScreen } from "../screens";

import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  const loadData = async () => {
    console.log("Loading....");
    //await loadNews();
    //await checkTheme();
    setTimeout(() => setIsLoading(false), 2000);
    console.log("Loading finished.");
  };

  useEffect(() => {
    loadData();

    return () => clearTimeout(loadData);
  }, []);

  if (isLoading) {
    return (
      <>
        <SplashScreen />
      </>
    );
  }

  return (
    <>
      {/* <View style={{ height: 50, alignItems: "center", justifyContent: "flex-end", backgroundColor: "#aaa" }}>
        <Text style={{ fontSize: 14, color: "#fff", textAlign: "center" }}>{data}</Text>
      </View> */}
      <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="Home" component={EpisodesScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen
            name="EpisodeDetail"
            component={EpisodeDetailScreen}
            options={{
              gestureEnabled: false,
              animation: "slide_from_right",
              headerTransparent: true,
            }}
          />
          <Stack.Screen name="CharactersScreen" component={CharactersScreen} options={{ gestureEnabled: false, animation: "slide_from_right" }} />
          <Stack.Screen name="CharacterDetailScreen" component={CharacterDetailScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="FavCharactersScreen" component={FavCharactersScreen} options={{ gestureEnabled: false, animation: "slide_from_right" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;
