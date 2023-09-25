export function parseElo(elo) {
  const colorMap = new Map([
    [["Netherite"], ["#d8b4fe", "#a855f7"]],
    [
      ["Diamond I", "Diamond II", "Diamond III"],
      ["#67e8f9", "#06b6d4"],
    ],
    [
      ["Emerald I", "Emerald II", "Emerald III"],
      ["#6ee7b7", "#10b981"],
    ],
    [
      ["Gold III", "Gold II", "Gold I"],
      ["#fde047", "#eab308"],
    ],
    [
      ["Iron III", "Iron II", "Iron I"],
      ["#d1d5db", "#6b7280"],
    ],
    [
      ["Coal I", "Coal II", "Coal III"],
      ["#4b5563", "#1f2937"],
    ],
    [[null], ["#64748b"]],
  ]);

  const rank =
    elo > 2000
      ? "Netherite"
      : elo > 1800 && elo < 1999
      ? "Diamond III"
      : elo > 1650 && elo < 1799
      ? "Diamond II"
      : elo > 1500 && elo < 1649
      ? "Diamond I"
      : elo > 1400 && elo < 1499
      ? "Emerald I"
      : elo > 1300 && elo < 1399
      ? "Emerald II"
      : elo > 1200 && elo < 1299
      ? "Emerald I"
      : elo > 1100 && elo < 1199
      ? "Gold III"
      : elo > 1000 && elo < 1099
      ? "Gold II"
      : elo > 900 && elo < 999
      ? "Gold I"
      : elo > 800 && elo < 899
      ? "Iron III"
      : elo > 700 && elo < 799
      ? "Iron II"
      : elo > 600 && elo < 699
      ? "Iron I"
      : elo > 500 && elo < 599
      ? "Coal III"
      : elo > 400 && elo < 499
      ? "Coal II"
      : elo > 0
      ? "Coal I"
      : null;

  const keys = Array.from(colorMap.keys());

  return {
    rank,
    color: colorMap.get(keys.find(key => key.includes(rank))),
  };
}
