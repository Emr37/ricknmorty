import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { favControl } from "../store/userSlice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CharacterCard from "../components/CharacterCard";

const FavCharactersScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { favChar } = useSelector((state) => state.user);
  const [item, setItem] = useState(null);

  const getValues = async () => {
    //const res = await dispatch(favControl());
    //console.log("---", res);
    //setItem(res.payload.character);
  };

  useEffect(() => {
    getValues();
  }, []);

  useFocusEffect(
    useCallback(() => {
      //dispatch(favControl());

      console.log("Focus effect girişi");
      console.log("Karakterler Ekranı -", favChar);

      return () => {
        console.log("Focus effect çıkışı");
      };
    }, [])
  );
  useEffect(() => {
    //dispatch(favControl());
    console.log("initial fonk. çalıştı");

    console.log("Characters Screen Useffect çalıştı.");
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: insets.top }]}>
        <Text style={styles.title}>Favourite Characters</Text>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={favChar}
          renderItem={({ item }) => <CharacterCard data={item} favChar={true} />}
          keyExtractor={(item) => item?.id}
          //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={resfreshTasks} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ margin: 2 }}
        />
      </View>
    </View>
  );
};

export default FavCharactersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    height: 60,
    width: "100%",
    backgroundColor: "#98cb53",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  titleContainer: {
    height: "100%",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  bodyContainer: {
    flex: 1,
  },
});
