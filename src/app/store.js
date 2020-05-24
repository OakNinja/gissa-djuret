import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialDatabase = {
  query: 'Bor den i vattnet?',
  yes: {
    query: 'Äter den träd?',
    yes: {
      guess: 'bäver'
    },
    no: {
      query: 'Bor den i havet?',
      yes: {
        query: 'Är den ett däggdjur?',
        yes: {
          guess: 'val'
        },
        no: {
          query: 'Ser den ut som en orm?',
          yes: {
            guess: 'ål'
          },
          no: {
            guess: 'haj'
          }
        }
      },
      no: {
        guess: 'gädda'
      }
    }
  },
  no: {
    query: 'Har den horn?',
    yes: {
      query: 'Har den snabel?',
      yes: {
        guess: 'Elefant'
      },
      no: {
        query: 'Kryper den?',
        yes: {
          guess: 'snigel'
        },
        no: {
          query: 'Har den lång hals?',
          yes: {
            guess: 'giraff'
          },
          no: {
            query: 'Har den korta ben?',
            yes: {
              guess: 'noshörning'
            },
            no: {
              query: 'Bä?',
              yes: {
                guess: 'get'
              },
              no: {
                guess: 'Älg'
              }
            }
          }
        }
      }
    },
    no: {
      query: 'Kryper den på marken?',
      yes: {
        query: 'Saknar den ben?',
        yes: {
          query: 'Kan den äta en mus?',
          yes: {
            guess: 'orm'
          },
          no: {
            guess: 'mask'
          }
        },
        no: {
          query: 'Har den svans?',
          yes: {
            guess: 'krokodil'
          },
          no: {
            guess: 'skalbagge'
          }
        }
      },
      no: {
        query: 'Mu?',
        yes: {
          guess: 'kossa'
        },
        no: {
          query: 'Får den valpar?',
          yes: {
            guess: 'hund'
          },
          no: {
            query: 'Har den päls?',
            yes: {
              query: 'Är den prickig?',
              yes: {
                guess: 'leopard'
              },
              no: {
                query: 'Är den randig?',
                yes: {
                  guess: 'lejon'
                },
                no: {
                  guess: 'räv'
                }
              }
            },
            no: {
              query: 'Är den mindre än 1 cm?',
              yes: {
                guess: 'lus'
              },
              no: {
                guess: 'gris'
              }
            }
          }
        }
      }
    }
  }
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
