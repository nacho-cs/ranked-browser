import { Table } from "./Table.jsx";
import { Loading } from "./Loading.jsx";
import { PlayerInfo } from "./PlayerInfo.jsx";
import { fetcher } from "../utils";
import useSWR from "swr";

export function Leaderboard() {
  const { data, isLoading } = useSWR(
    "https://mcsrranked.com/api/leaderboard",
    fetcher
  );

  if (isLoading) return <Loading />;
  const {
    data: { users },
  } = data;

  return (
    <Table
      headers={["Place", "Player", "Elo"]}
      data={users.map(user => [
        user.elo_rank,
        <PlayerInfo player={user.nickname} />,
        user.elo_rate,
      ])}
    />
  );
}
