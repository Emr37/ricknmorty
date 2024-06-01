import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEpisodes } from "../store/episodesSlice";
import EpisodeCard from "../components/EpisodeCard";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import SearchBox from "../components/SearchBox";
import filter from "lodash.filter";

const EpisodesScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const { favChar } = useSelector((state) => state.user);
  const { loading, episodes, episodesInfo } = useSelector((state) => state.episodes);

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState(episodes);
  const [nextPage, setNextPage] = useState(episodesInfo?.next);

  const handleSearch = (query) => {
    setSearchQuery(query);

    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (episode) => {
      return contains(episode, formattedQuery);
    });
    setData(filteredData);
    console.log(filteredData);
  };

  const contains = ({ name }, query) => {
    if (name.toLowerCase().includes(query)) {
      return true;
    } else return false;
  };

  useEffect(() => {
    if (episodes.length === 0) {
      dispatch(getEpisodes());
    }
    console.log("Home Screen Mounted.");
    setFullData(episodes);

    return () => {
      console.log("Home Screen Unmounted.");
    };
  }, []);

  const loadMore = () => {
    console.log("Load More");
    setNextPage(episodesInfo.next);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.header, { marginTop: insets.top }]}>
        <TextInput
          placeholder="Search"
          clearButtonMode="always"
          style={styles.searchBox}
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
      </View>

      <View style={styles.bodyContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => <EpisodeCard data={item} related={false} />}
          keyExtractor={(item) => item?.id}
          //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={resfreshTasks} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ margin: 2 }}
          ListFooterComponent={() => {
            loading && (
              <>
                <TouchableOpacity onPress={loadMore} style={{ height: "100%", width: "100%" }}>
                  <Text style={{ color: "#98cb53", fontSize: 20, alignSelf: "center" }}>Load More</Text>
                </TouchableOpacity>
              </>
            );
          }}
          ListFooterComponentStyle={{ height: 50, justifyContent: "center", alignItems: "center" }}
        />
      </View>
    </View>
  );
};

export default EpisodesScreen;

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
  searchBox: {
    width: "80%",
    height: "90%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  bodyContainer: {
    flex: 1,
  },

  text: {
    color: "#eee",
    fontSize: 16,
    fontWeight: "500",
  },

  title: {
    color: "#eee",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    //backgroundColor: "red",
  },

  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  refreshLoading: {
    zIndex: 1,
  },
});
