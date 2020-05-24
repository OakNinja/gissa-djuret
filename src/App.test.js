import { learn } from "./app/store";

test("not learns from unrelated answer", () => {
  const database = { guess: "Fisk" };
  expect(learn(database, "Torsk", "Gris", "Kan den cykla?")).toEqual(database);
});

test("learns from answer", () => {
  const database = { guess: "Fisk" };
  expect(learn(database, "Fisk", "Svensk", "Kan den cykla?")).toEqual({
    query: "Kan den cykla?",
    yes: {
      guess: "Svensk",
    },
    no: {
      guess: "Fisk",
    },
  });
});

test("learns from answer in tree", () => {
  const database = {
    query: "Bor den i vatten?",
    yes: { guess: "Fisk" },
    no: { guess: "Björn" },
  };
  expect(learn(database, "Fisk", "Svensk", "Kan den cykla?")).toEqual({
    query: "Bor den i vatten?",
    yes: {
      query: "Kan den cykla?",
      yes: {
        guess: "Svensk",
      },
      no: {
        guess: "Fisk",
      },
    },
    no: { guess: "Björn" },
  });
});
