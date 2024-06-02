import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCharacter = createAsyncThunk("character/getCharacter", async (id) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);

  if (res.status !== 200)
    return {
      status: false,
      character: null,
    };

  return {
    status: true,
    character: res.data,
  };
});

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    loading: false,
    character: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacter.pending, (state) => {
      state.loading = true;
      state.character = null;
    });
    builder.addCase(getCharacter.fulfilled, (state, action) => {
      (state.loading = false), (state.character = action.payload.character);
    });
    builder.addCase(getCharacter.rejected, (state) => {
      console.log("GetCharacter rejected");
      state.loading = false;
      state.character = null;
    });
  },
});

export default characterSlice.reducer;
