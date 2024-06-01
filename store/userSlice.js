import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: null,
    user: null,
    favCharacters: [],
    loading: true,
    deneme: {
      name: "Emrah",
      job: "Developer",
    },
  },
  reducers: {
    addFav: (state, action) => {
      (state.user = null), (state.isAuth = null);
      // buraya favori ekleme state i yazılacak.
    },
    deleteFav: (state, action) => {
      (state.user = null), (state.isAuth = null);
      // buraya favori silme state i yazılacak.
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
