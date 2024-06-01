import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; //Buraya config axios dahil edilebilir.

export const getEpisodes = createAsyncThunk("episodes/getEpisodes", async () => {
  const res = await axios.get("https://rickandmortyapi.com/api/episode");

  if (res.status !== 200)
    return {
      status: false,
      episodes: [],
      episodesInfo: null,
    };

  return {
    status: false,
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEpisodes.pending, (state) => {
      state.loading = true;
      state.episodes = [];
      state.episodesInfo = null;
    });
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      (state.loading = false), (state.episodes = action.payload.episodes);
      state.episodesInfo = action.payload.episodesInfo;
    });
    builder.addCase(getEpisodes.rejected, (state) => {
      console.log("GetEpisodes rejected");
      state.loading = false;
      state.episodes = [];
      state.episodesInfo = null;
    });
  },
});

export default episodesSlice.reducer;
