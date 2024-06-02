import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getCharacter } from "../store/characterSlice";
import Ionicons from "@expo/vector-icons/Ionicons";

const { height, width } = Dimensions.get("window");

const CharacterCard = ({ data }) => {
  //let id = data.split("character/")[1];
  const dispatch = useDispatch();
  const { loading, character } = useSelector((state) => state.character);
  const { favChar } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const [item, setItem] = useState(null);
  const [favo, setFavo] = useState(false);

  const getValues = async () => {
    const resChar = await dispatch(getCharacter(data));
    console.log("---", resChar.payload.character);
    setItem(resChar.payload.character);

    console.log("----", favChar);
  };

  const fChar = () => {
    if (favChar.includes(data)) {
      setFavo(true);
    } else setFavo(false);
  };

  useEffect(() => {
    console.log("Karakter ", typeof data);
    console.log("*** ", favo);
    fChar();
    getValues();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.image}
          onPress={() => {
            navigation.navigate("CharacterDetail", {
              id: data,
              data: item,
              name: item.name,
            });
            console.log(data, "Tıklandı");
          }}
        >
          <Image
            style={{ width: "99%", height: "99%", resizeMode: "contain", opacity: 0.7 }}
            source={{ uri: `https://rickandmortyapi.com/api/character/avatar/${data}.jpeg` }}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          {!item ? (
            <ActivityIndicator color={"#98cb53"} />
          ) : (
            <>
              <TouchableOpacity style={styles.star} onPress={() => setFavo((x) => !x)}>
                <Ionicons name={favo ? "star" : "star-outline"} size={32} color="gold" />
              </TouchableOpacity>
              <Text style={styles.title}>{item?.name}</Text>
              <Text style={styles.subTitle}>Status : {item?.status}</Text>
              <Text style={styles.subTitle}>Species: {item?.species}</Text>
              <Text style={styles.subTitle}>Gender : {item?.gender}</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default CharacterCard;

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
    minHeight: 70,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
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
  star: {
    zIndex: 1,
    position: "absolute",
    right: 12,
    bottom: 16,
  },
});
