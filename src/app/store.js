import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialDatabase = {
  query: "Bor den i vattnet?",
  yes: {
    guess: "Gädda",
  },
  no: {
    query: "Har den horn?",
    yes: {
      guess: "Älg",
    },
    no: {
      guess: "Gris",
    },
  },
};

export const gissaDjuretSlice = createSlice({
  name: "gissaDjuret",
  initialState: {
    initialDatabase: initialDatabase,
    database: initialDatabase,
    message: "",
    ask: false,
    answer: "",
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
    guessYes: (state) => {
      return { ...state, message: "Wohoo!" };
    },
    guessNo: (state) => {
      return { ...state, ask: true };
    },
    setAnswer: (state, action) => {
      return { ...state, answer: action.payload };
    },
    setQuery: (state, action) => {
      console.log(state, action);
      const { guess, answer, query } = action.payload;
      const betterDatabase = learn(state.initialDatabase, guess, answer, query);
      return {
        ...state,
        initialDatabase: betterDatabase,
        database: betterDatabase,
        message: "Bättre lycka nästa gång!",
        ask: false,
        answer: null,
      };
    },
  },
});

export function learn(database, oldGuess, answer, newQuery) {
  const { query, guess, yes, no } = database;
  console.log(guess);
  if (guess === oldGuess) {
    return {
      query: newQuery,
      yes: {
        guess: answer,
      },
      no: database,
    };
  }
  if (query) {
    return {
      query,
      yes: learn(yes, oldGuess, answer, newQuery),
      no: learn(no, oldGuess, answer, newQuery),
    };
  }
  return database;
}

export default configureStore({
  reducer: gissaDjuretSlice.reducer,
});
