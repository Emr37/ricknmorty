import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEpisode } from "../store/episodeSlice";
import CharacterCard from "../components/CharacterCard";

const EpisodeDetailScreen = ({ route }) => {
  const { id, name, data } = route.params;
  const dispatch = useDispatch();
  const { episode } = useSelector((state) => state.episode);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [epItem, setEpItem] = useState(null);

  const getValues = async () => {
    const res = await dispatch(getEpisode(id));
    console.log("Episode Detail screen - ", res.payload.episode);
    setEpItem(res.payload.episode);
  };
  useEffect(() => {
    getValues();
  }, []);

  const newlist = [];
  newlist.push(data?.characters);
  //console.log("new list", newlist[0]);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={32} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Ionicons name="home" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        {!epItem ? (
          <ActivityIndicator color={"#98cb53"} />
        ) : (
          <View style={styles.subTitleContainer}>
            <Text style={[styles.subTitle, { textAlign: "right" }]}>{epItem.air_date}</Text>
            <Text style={styles.subTitle}>
              Session {epItem.episode.split("S")[1].split("E")[0]}-Episode {epItem.episode.split("S")[1].split("E")[1]}
            </Text>
            <Text style={styles.subTitle}>Characters</Text>
          </View>
        )}

        <FlatList
          data={newlist[0]}
          renderItem={({ item }) => <CharacterCard data={item.split("character/")[1]} />} // id olarak denenebilir.
          keyExtractor={(item) => item.split("character/")[1]}
          //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={resfreshTasks} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ margin: 2 }}
        />
      </View>
    </View>
  );
};

export default EpisodeDetailScreen;

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
    justifyContent: "space-between",
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
  subTitleContainer: {
    height: "auto",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    width: "100%",
    textAlign: "center",
  },
  bodyContainer: {
    flex: 1,
  },
});
