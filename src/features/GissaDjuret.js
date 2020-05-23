import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { gissaDjuretSlice } from "../app/store";

export const selectQuery = (state) => state.database.query;
export const selectAnswer = (state) => state.database.answer;
export const selectMessage = (state) => state.message;

export function GissaDjuret() {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery);
  const answer = useSelector(selectAnswer);
  const message = useSelector(selectMessage);

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

  if (answer) {
    return (
      <div>
        <div>Skulle det kunna vara en {answer}?</div>
        <div>
          <button
            onClick={() => dispatch(gissaDjuretSlice.actions.answerYes())}
          >
            Ja
          </button>
          <button onClick={() => dispatch(gissaDjuretSlice.actions.answerNo())}>
            Nej
          </button>
        </div>
      </div>
    );
  }
}
