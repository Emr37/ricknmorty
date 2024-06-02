import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import episodesReducer from "./episodesSlice";
import episodeReducer from "./episodeSlice";
import characterReducer from "./characterSlice";
import charactersReducer from "./charactersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    episodes: episodesReducer,
    episode: episodeReducer,
    character: characterReducer,
    characters: charactersReducer,
  },
});
