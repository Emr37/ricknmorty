import React, { useState, useEffect, useContext, useRef } from "react";
import { Platform, Alert } from "react-native";
import { NavigationContainer, DarkTheme, DefaultTheme, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../components/Splash";
import { CharactersScreen, CharacterDetailScreen, EpisodesScreen, EpisodeDetailScreen, FavCharactersScreen } from "../screens";
import "react-native-gesture-handler";
import { TabNav } from "./TabNav";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);

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
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="HomeScreen" component={TabNav} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Episodes" component={EpisodesScreen} options={{ gestureEnabled: false, animation: "slide_from_right" }} />
          <Stack.Screen
            name="EpisodeDetail"
            component={EpisodeDetailScreen}
            options={{
              gestureEnabled: false,
              animation: "slide_from_right",
              headerTransparent: true,
            }}
          />
          <Stack.Screen name="Characters" component={CharactersScreen} options={{ gestureEnabled: false, animation: "slide_from_right" }} />
          <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} options={{ gestureEnabled: false }} />
          <Stack.Screen name="FavCharacters" component={FavCharactersScreen} options={{ gestureEnabled: false, animation: "slide_from_right" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default RootNavigation;
