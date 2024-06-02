import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput, ActivityIndicator, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacter } from "../store/characterSlice";
import EpisodeCard from "../components/EpisodeCard";

const { height, width } = Dimensions.get("window");

const CharacterDetailScreen = ({ route }) => {
  const { id, name, data } = route.params;
  const dispatch = useDispatch();
  const { character } = useSelector((state) => state.character);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [charItem, setCharItem] = useState(null);
  const [favChar, setFavCar] = useState(false);

  const getValues = async () => {
    const res = await dispatch(getCharacter(id));
    console.log("Character Detail screen - ", res.payload.character);
    setCharItem(res.payload.character);
  };
  useEffect(() => {
    getValues();
  }, []);

  const newlist = [];
  newlist.push(data?.episode);
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

      <ScrollView contentContainerStyle={{ alignItems: "center" }} nestedScrollEnabled>
        <View style={styles.image}>
          <Image
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            source={{ uri: `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg` }}
          />
        </View>

        {!charItem ? (
          <ActivityIndicator color={"#98cb53"} size={"large"} />
        ) : (
          <View style={styles.perInfoContainer}>
            <TouchableOpacity style={styles.star} onPress={() => setFavCar((x) => !x)}>
              <Ionicons name={favChar ? "star" : "star-outline"} size={32} color="gold" />
            </TouchableOpacity>
            <Text style={styles.perInfoTitle}>Status: {charItem.status}</Text>
            <Text style={styles.perInfoTitle}>Species: {charItem.species}</Text>
            <Text style={styles.perInfoTitle}>Gender: {charItem.gender}</Text>
            <Text style={styles.perInfoTitle}>Origin: {charItem.origin.name}</Text>
            <Text style={styles.perInfoTitle}>Location: {charItem.location.name}</Text>
          </View>
        )}

        <View style={{ width: "100%", height: "100%", backgroundColor: "#eee" }}>
          <FlatList
            nestedScrollEnabled
            data={newlist[0]}
            renderItem={({ item }) => <EpisodeCard data={item.split("episode/")[1]} />}
            keyExtractor={(item) => item.split("episode/")[1]}
            //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={resfreshTasks} />}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={{ margin: 2 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CharacterDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  image: {
    width,
    height: 250,
    alignItems: "center",
    overflow: "hidden",
  },
  perInfoContainer: {
    marginHorizontal: 10,
    height: "auto",
    width: width - 8,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#ccc",
    //overflow: "hidden",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 12,
    padding: 2,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  perInfoTitle: {
    fontSize: 24,
    fontWeight: "500",
  },
  star: {
    zIndex: 1,
    position: "absolute",
    right: 16,
    top: 4,
  },
});
