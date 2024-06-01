import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import episodesReducer from "./episodesSlice";
import episodeReducer from "./episodeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    episodes: episodesReducer,
    episode: episodeReducer,
  },
});
