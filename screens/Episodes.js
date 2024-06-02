import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEpisodes, setNextPage, setSearchQuery, setData, setFullData } from "../store/episodesSlice";
import EpisodeCard from "../components/EpisodeCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import filter from "lodash.filter";

const EpisodesScreen = () => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  const { loading, episodes, episodesInfo, searchQuery, data, fullData, nextPage } = useSelector((state) => state.episodes);

  useEffect(() => {
    if (episodes.length === 0) {
      dispatch(getEpisodes(null));
      console.log("initial fonk. çalıştı");
    }
    console.log("Home Screen Mounted.");

    if (episodesInfo) {
      dispatch(
        setNextPage({
          nextPage: episodesInfo.next,
        })
      );
    }

    return () => {
      console.log("Home Screen Unmounted.");
    };
  }, []);

  const loadMore = () => {
    console.log("Load More çalıştı");

    if (episodesInfo) {
      dispatch(getEpisodes(episodesInfo.next));
      dispatch(
        setNextPage({
          nextPage: episodesInfo.next,
        })
      );

      console.log("set full data çalıştı");
      dispatch(
        setFullData({
          fullData: [...fullData, episodes],
        })
      );

      console.log("set data çalıştı");

      dispatch(
        setData({
          data: [...data, episodes],
        })
      );
    }
  };

  const contains = ({ name }, query) => {
    if (name?.toLowerCase().includes(query)) {
      return true;
    } else return false;
  };

  const handleSearch = (query) => {
    dispatch(
      setSearchQuery({
        searchQuery: query,
      })
    );
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (episode) => {
      return contains(episode, formattedQuery);
    });
    //setData(filteredData);
    dispatch(
      setData({
        data: filteredData,
      })
    );
  };
  data.map((e) => console.log(e.id));

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
        {loading && <ActivityIndicator color={"#98cb53"} size={"large"} />}
        <FlatList
          data={data}
          renderItem={({ item }) => <EpisodeCard data={item?.id} related={false} />}
          keyExtractor={(item) => item?.id}
          //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={resfreshTasks} />}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{ margin: 2 }}
          ListFooterComponent={() =>
            nextPage && (
              <>
                {loading ? (
                  <ActivityIndicator color={"#98cb53"} />
                ) : (
                  <TouchableOpacity onPress={loadMore} style={{ height: "100%", width: "100%" }}>
                    <Text style={{ color: "#98cb53", fontSize: 20, alignSelf: "center" }}>Load More</Text>
                  </TouchableOpacity>
                )}
              </>
            )
          }
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
