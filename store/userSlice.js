import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { api } from '../config/axios';

export const favControl = createAsyncThunk("user/favControl", async () => {
  const favChar = await AsyncStorage.getItem("favChar"); // favChar

  if (favChar) {
    return {
      favChar: JSON.parse(favChar),
    };
  } else {
    return {
      favChar: [],
    };
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    favChar: [],
  },

  reducers: {
    addFavChar: (state, action) => {
      state.favChar = action.payload.user;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(favControl.pending, (state) => {
      state.favChar = [];
    });

    builder.addCase(favControl.fulfilled, (state, action) => {
      state.favChar = action.payload.favChar;
    });

    builder.addCase(favControl.rejected, (state) => {
      state.favChar = [];
    });
  },
});

export default userSlice.reducer;
export const { addFavChar } = userSlice.actions;
