import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const EpisodeCard = ({ data }) => {
  const dispatch = useDispatch();
  const { loading, episode } = useSelector((state) => state.episode);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("EpisodeDetail", {
            id: data?.id,
            url: data?.url,
            name: data?.name,
            data: episode,
            loading,
          });
          console.log(data?.id, "Tıklandı");
        }}
      >
        <View style={styles.image}>
          <Image style={{ width: "99%", height: "99%", resizeMode: "contain", opacity: 0.7 }} source={require("../assets/ricknmorty.png")} />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{data?.air_date}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Session {data?.episode.split("S")[1].split("E")[0]}</Text>
          <Text style={styles.title}>Episode {data?.episode.split("S")[1].split("E")[1]}</Text>
          <Text style={styles.subTitle}>{data?.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EpisodeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "no-wrap",
    justifyContent: "center",
  },
  card: {
    marginVertical: 4,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#ccc",
    overflow: "hidden",
    width: "96%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 12,
    //padding: 2,
    paddingTop: 0,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    width,
    height: 200,
    alignItems: "center",
    overflow: "hidden",
  },
  titleContainer: {
    width: "100%",
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
  dateContainer: {
    height: 20,
    marginTop: -20,
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },

  date: {
    fontSize: 14,
    textAlign: "right",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
    fontWeight: "400",
    backgroundColor: "#00000060",
    width: "100%",

    paddingHorizontal: 8,
  },
});
