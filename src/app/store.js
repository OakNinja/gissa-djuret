import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialDatabase = {
  query: "Bor den i vattnet?",
  yes: {
    answer: "Gädda",
  },
  no: {
    query: "Har den horn?",
    yes: {
      answer: "Älg",
    },
    no: {
      answer: "Gris",
    },
  },
};

export const gissaDjuretSlice = createSlice({
  name: "gissaDjuret",
  initialState: {
    initialDatabase: initialDatabase,
    database: initialDatabase,
    message: "",
  },
  reducers: {
    playAgain: (state) => {
      return {
        ...state,
        database: state.initialDatabase,
        message: null,
      };
    },
    yes: (state) => {
      return { ...state, database: state.database.yes };
    },
    no: (state) => {
      return { ...state, database: state.database.no };
    },
    answerYes: (state) => {
      return { ...state, message: "Wohoo!" };
    },
    answerNo: (state) => {
      return { ...state, message: "You suck!" };
    },
  },
});

export default configureStore({
  reducer: gissaDjuretSlice.reducer,
});
