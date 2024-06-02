import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCharacters = createAsyncThunk("characters/getCharacters", async (nextPage) => {
  console.log("Get Characters çalıştı", nextPage);
  const res = await axios.get(nextPage || "https://rickandmortyapi.com/api/character");

  if (res.status !== 200)
    return {
      status: false,
      characters: [],
      charactersInfo: null,
    };

  return {
    status: true,
    characters: res.data?.results,
    charactersInfo: res.data?.info,
  };
});

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    loading: false,
    characters: [],
    charactersInfo: null,
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
    builder.addCase(getCharacters.pending, (state) => {
      state.loading = true;
      state.characters = [];
      state.charactersInfo = null;
      state.nextPage = null;
      state.data = [];
      state.fullData = [];
    });
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.loading = false;
      state.characters = action.payload.characters;
      state.charactersInfo = action.payload.charactersInfo;
      state.nextPage = action.payload.charactersInfo.next;
      state.data = action.payload.characters;
      state.fullData = action.payload.characters;
    });
    builder.addCase(getCharacters.rejected, (state) => {
      console.log("GetCharacters rejected");
      state.loading = false;
      state.characters = [];
      state.charactersInfo = null;
      state.nextPage = null;
      state.data = [];
      state.fullData = [];
    });
  },
});

export default charactersSlice.reducer;
export const { setNextPage, setSearchQuery, setData, setFullData } = charactersSlice.actions;
