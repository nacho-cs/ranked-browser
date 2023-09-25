// This file is meant to be ran with nodejs, not in the browser

import { readFile, writeFile } from "fs/promises";

const txt = await readFile("result.txt", "utf-8");
const players = txt
  .split("\n")
  .slice(0, -1)
  .map(player => player.split(" ")[0]);

const base = [
  {
    name: "Match leaderboard",
    path: "/match-leaderboard",
  },
  {
    name: "Leaderboard",
    path: "/leaderboard",
  },
  {
    name: "Record Leaderboard",
    path: "/match-leaderboard",
  },
  {
    name: "Player Leaderboard",
    path: "/leaderboard",
  },
];

for (let i = 0; i < players.length; i++) {
  base.push({
    name: `${players[i]}`,
    path: `/player/${players[i]}`,
  });
  for (let j = i + 1; j < players.length; j++) {
    base.push({
      name: `${players[i]} vs. ${players[j]}`,
      path: `/player/${players[i]}/vs/${players[j]}`,
    });
    base.push({
      name: `${players[j]} vs. ${players[i]}`,
      path: `/player/${players[j]}/vs/${players[i]}`,
    });
  }
}

await writeFile("./results.json", JSON.stringify(base));
