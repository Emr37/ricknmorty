import RootNavigation from "./navigation/root";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <RootNavigation />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
