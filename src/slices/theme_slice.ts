import { createSlice } from "@reduxjs/toolkit";

export type ThemeState = {
  darkMode: boolean;
  primaryColor: string;
  errorColor: string;
  primaryTextColor: string;
  errorTextColor: string;
};

const initialThemeState = {
  darkMode: true,
  primaryColor: "bg-zinc-900",
  errorColor: "bg-white",
  primaryTextColor: "text-white",
  errorTextColor: "text-black",
} as ThemeState;

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        state.primaryColor = "bg-zinc-900";
        state.errorColor = "bg-white";
        state.primaryTextColor = "text-white";
        state.errorTextColor = "text-black";
      } else {
        state.primaryColor = "bg-white";
        state.errorColor = "bg-zinc-900";
        state.primaryTextColor = "text-black";
        state.errorTextColor = "text-white";
      }
    },
  },
});

export default themeSlice;

export const themeSliceActions = themeSlice.actions;
