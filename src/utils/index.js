import { atom } from "jotai";
import data from "../data/results.json";
import Fuse from "fuse.js";

export { fetcher } from "./fetcher.js";
export { formatTime } from "./format-time.js";
export { relativeTime } from "./relative-time.js";
export { parseElo } from "./parse-elo.js";
export { matchEvents } from "./match-event.js";
export const MATCHES_PLAYED = 523736;
export const matchesAtom = atom([]);
export const searchAtom = atom("");
export const idx = new Fuse(data, {
  keys: ["name"],
});
