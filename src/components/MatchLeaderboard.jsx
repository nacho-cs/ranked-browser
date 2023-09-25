import { Table } from "./Table.jsx";
import { Loading } from "./Loading.jsx";
import { Tabs, Box, Card, Link } from "@radix-ui/themes";
import { PlayerInfo } from "./PlayerInfo.jsx";
import { relativeTime, formatTime, fetcher } from "../utils";
import uniqBy from "lodash.uniqby";
import useSWR from "swr";
import { HoverDetailedMatchCard } from "./HoverDetailedMatchCard.jsx";

export function MatchLeaderboard() {
  const { data, isLoading } = useSWR(
    `https://mcsrranked.com/api/record-leaderboard`,
    fetcher
  );

  if (isLoading) return <Loading />;
  const { data: matches } = data;

  return (
    <Card style={{ width: "fit-content" }}>
      <Tabs.Root defaultValue="all">
        <Tabs.List>
          <Tabs.Trigger value="all">Show All</Tabs.Trigger>
          <Tabs.Trigger value="unique">Show unique</Tabs.Trigger>
        </Tabs.List>
        <Box py="3">
          <Tabs.Content value="all">
            <Table
              headers={["Place", "Player", "Time", "Date"]}
              data={matches.map(match => [
                match.final_time_rank,
                <PlayerInfo player={match.user.nickname} />,
                <HoverDetailedMatchCard id={match.match_id}>
                  <Link color="gray">
                    {formatTime(new Date(match.final_time))}
                  </Link>
                </HoverDetailedMatchCard>,
                relativeTime(new Date(match.match_date * 1000)),
              ])}></Table>
          </Tabs.Content>
          <Tabs.Content value="unique">
            <Table
              headers={["Place", "Player", "Time", "Date"]}
              data={uniqBy(matches, "user.uuid").map(match => [
                match.final_time_rank,
                <PlayerInfo player={match.user.nickname} />,
                <HoverDetailedMatchCard id={match.match_id}>
                  <Link color="gray">
                    {formatTime(new Date(match.final_time))}
                  </Link>
                </HoverDetailedMatchCard>,
                relativeTime(new Date(match.match_date * 1000)),
              ])}></Table>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Card>
  );
}
