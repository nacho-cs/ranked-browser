// This file is meant to be ran with nodejs, not in the browser

import { readFile, writeFile } from "fs/promises";

const txt = await readFile("result.txt", "utf-8");
const players = txt.split("\n").slice(0, -1);

const base = [
  {
    name: "Match leaderboard",
    path: "/match-leaderboard",
  },
  {
    name: "Leaderboard",
    path: "/leaderboard",
  },
];

for (let i = 0; i < players.length; i++) {
  base.push({
    name: players[i],
    path: `/player/${players[i]}`,
  });
}

await writeFile("./results.json", JSON.stringify(base));
