import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; //Buraya config axios dahil edilebilir.

export const getEpisodes = createAsyncThunk("episodes/getEpisodes", async (nextPage) => {
  console.log("Getepisodes çalıştı", nextPage);
  const res = await axios.get(nextPage || "https://rickandmortyapi.com/api/episode");

  if (res.status !== 200)
    return {
      status: false,
      episodes: [],
      episodesInfo: null,
    };

  return {
    status: true,
    episodes: res.data?.results,
    episodesInfo: res.data?.info,
  };
});

export const episodesSlice = createSlice({
  name: "episodes",
  initialState: {
    loading: false,
    episodes: [],
    episodesInfo: null,
    nextPage: null,
    searchQuery: "",
    data: [],
    fullData: [],
  },
  reducers: {
    setNextPage: (state, action) => {
      state.nextPage = action.payload.nextPage;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.searchQuery;
    },
    setData: (state, action) => {
      state.data = action.payload.data;
    },
    setFullData: (state, action) => {
      state.fullData = action.payload.fullData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEpisodes.pending, (state) => {
      state.loading = true;
      state.episodes = [];
      state.episodesInfo = null;
      state.nextPage = null;
      state.data = [];
      state.fullData = [];
    });
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.loading = false;
      state.episodes = action.payload.episodes;
      state.episodesInfo = action.payload.episodesInfo;
      state.nextPage = action.payload.episodesInfo.next;
      state.data = action.payload.episodes;
      state.fullData = action.payload.episodes;
    });
    builder.addCase(getEpisodes.rejected, (state) => {
      console.log("GetEpisodes rejected");
      state.loading = false;
      state.episodes = [];
      state.episodesInfo = null;
      state.nextPage = null;
      state.data = [];
      state.fullData = [];
    });
  },
});

export default episodesSlice.reducer;
export const { setNextPage, setSearchQuery, setData, setFullData } = episodesSlice.actions;
