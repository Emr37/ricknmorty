import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; //Buraya config axios dahil edilebilir.

export const getEpisode = createAsyncThunk("episode/getEpisode", async (id) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`);

  if (res.status !== 200)
    return {
      status: false,
      episode: null,
    };

  return {
    status: true,
    episode: res.data,
  };
});

export const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    loading: false,
    episode: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEpisode.pending, (state) => {
      state.loading = true;
      state.episode = null;
    });
    builder.addCase(getEpisode.fulfilled, (state, action) => {
      (state.loading = false), (state.episode = action.payload.episode);
    });
    builder.addCase(getEpisode.rejected, (state) => {
      console.log("GetEpisode rejected");
      state.loading = false;
      state.episode = null;
    });
  },
});

export default episodeSlice.reducer;
