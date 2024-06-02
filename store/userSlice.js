import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { api } from '../config/axios';
import { getCharacters, setNextPage, setSearchQuery, setData, setFullData } from "../store/charactersSlice";

export const favControl = createAsyncThunk("user/favControl", async () => {
  const favChar = await AsyncStorage.getItem("favChar"); // favChar
  console.log("favControl", favChar);

  if (favChar) {
    return {
      favChar,
    };
  } else {
    return {
      favChar: [],
    };
  }
});
export const addFav = createAsyncThunk("user/addFav", async (fav) => {
  const favChar = await AsyncStorage.getItem("favChar"); // favChar

  await AsyncStorage.setItem("favChar", fav); // favChar
  console.log("Adfav çalıştı", fav);

  // if (favChar) {
  //   return {
  //     favChar: JSON.parse(favChar),
  //   };
  // } else {
  //   return {
  //     favChar: [],
  //   };
  // }
});
export const deleteFav = createAsyncThunk("user/deleteFav", async (fav) => {
  const res = await AsyncStorage.getItem("favChar"); // favChar
  await AsyncStorage.removeItem("favChar"); // favChar

  {
    /*işlem yapılacak*/
  }

  await AsyncStorage.setItem("favChar", fav); // favChar

  console.log("deleteFav", fav);

  // if (favChar) {
  //   return {
  //     favChar: JSON.parse(favChar),
  //   };
  // } else {
  //   return {
  //     favChar: [],
  //   };
  // }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    favChar: [2, 4],
  },

  reducers: {},

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
export const {} = userSlice.actions;
