import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gissaDjuretSlice } from "../app/store";

export const selectQuery = (state) => state.database.query;
export const selectGuess = (state) => state.database.guess;
export const selectMessage = (state) => state.message;
export const selectAsk = (state) => state.ask;
export const selectAnswer = (state) => state.answer;

export function GissaDjuret() {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const guess = useSelector(selectGuess);
  const message = useSelector(selectMessage);
  const answer = useSelector(selectAnswer);
  const ask = useSelector(selectAsk);

  const [newAnswer, setNewAnswer] = useState("");
  const [newQuery, setNewQuery] = useState("");

  if (ask) {
    if (!answer) {
      return (
        <div>
          <div>Vad tänkte du på för djur?</div>
          <div>
            <input
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            ></input>
            <button
              onClick={() => {
                dispatch(gissaDjuretSlice.actions.setAnswer(newAnswer));
              }}
            >
              Svara
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Hur skulle du ställa en fråga där svaret är "ja" för en {answer} men
          "nej" för en {guess}?
          <input
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
          ></input>
          <button
            onClick={() => {
              dispatch(
                gissaDjuretSlice.actions.setQuery({
                  guess: guess,
                  answer: answer,
                  query: newQuery,
                })
              );
              setNewAnswer("");
              setNewQuery("");
            }}
          >
            Svara
          </button>
        </div>
      );
    }
  }

  if (message) {
    return (
      <div>
        <h1>{message}</h1>
        <button
          onClick={() => {
            dispatch(gissaDjuretSlice.actions.playAgain());
          }}
        >
          Spela igen
        </button>
      </div>
    );
  }

  if (query) {
    return (
      <div>
        <div>{query}</div>
        <div>
          <button onClick={() => dispatch(gissaDjuretSlice.actions.yes())}>
            Ja
          </button>
          <button onClick={() => dispatch(gissaDjuretSlice.actions.no())}>
            Nej
          </button>
        </div>
      </div>
    );
  }

  if (guess) {
    return (
      <div>
        <div>Skulle det kunna vara en {guess}?</div>
        <div>
          <button onClick={() => dispatch(gissaDjuretSlice.actions.guessYes())}>
            Ja
          </button>
          <button onClick={() => dispatch(gissaDjuretSlice.actions.guessNo())}>
            Nej
          </button>
        </div>
      </div>
    );
  }
}
