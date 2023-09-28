import { Card, Tabs, Button, Text, Flex, ScrollArea } from "@radix-ui/themes";
import { Table } from "./Table.jsx";
import useSWR from "swr/infinite";
import { relativeTime, fetcher, formatTime, matchesAtom } from "../utils";
import { Loading } from "./Loading.jsx";
import { PlayerInfo } from "./PlayerInfo.jsx";
import { HoverDetailedMatchCard } from "./HoverDetailedMatchCard.jsx";
import { useAtom } from "jotai";
import { useEffect } from "preact/compat";

export function MatchList({ player, vs }) {
  const vsPart = vs ? `versus/${vs}/matches` : "matches";

  function getKey(page) {
    return `https://mcsrranked.com/api/users/${player}/${vsPart}?page=${page}`;
  }

  const { data, isLoading, setSize, size } = useSWR(getKey, fetcher);
  const [, setMatches] = useAtom(matchesAtom);

  if (isLoading) return <Loading />;

  const matches = data.reduce((accum, curr) => {
    return accum.concat(curr.data);
  }, []);

  useEffect(() => setMatches(matches), [size]);

  function MatchTable({ matchType }) {
    const filtered =
      matchType !== null
        ? matches.filter(match => match.match_type === matchType)
        : matches;

    const matchMatrix = filtered.map(match => {
      const didWin =
        match.winner &&
        match.members.find(member => member.nickname === player).uuid ===
          match.winner;

      return !match.is_decay
        ? [
            match.members.length > 1
              ? match.members
                  .filter(member => (vs ? true : member.nickname !== player))
                  .map(member => <PlayerInfo player={member.nickname} />)
              : "No Opponents",
            vs && match.winner ? (
              <Text as="span" color="gray">
                {
                  match.members.find(member => member.uuid === match.winner)
                    .nickname
                }
              </Text>
            ) : didWin ? (
              <Text as="span" color="green">
                Won
              </Text>
            ) : match.winner ? (
              <Text as="span" color="red">
                Lost
              </Text>
            ) : (
              <Text as="span" color="blue">
                Draw
              </Text>
            ),
            matchType === 2 ? (
              <HoverDetailedMatchCard id={match.match_id}>
                {match.forfeit ? (
                  <i>Forfeit</i>
                ) : (
                  <Text as="span">
                    {formatTime(new Date(match.final_time))}
                  </Text>
                )}
              </HoverDetailedMatchCard>
            ) : match.forfeit ? (
              <i>Forfeit</i>
            ) : (
              formatTime(new Date(match.final_time))
            ),
            relativeTime(new Date(match.match_date * 1000)),
          ]
        : [
            "Elo decay",
            <i>-5 Elo</i>,
            "",
            relativeTime(new Date(match.match_date * 1000)),
          ];
    });

    return (
      <Table
        data={matchMatrix}
        headers={["Members", "Winner", "Time", "Date"]}
      />
    );
  }

  return (
    <Card style={{ width: "fit-content" }}>
      <Tabs.Root defaultValue="all">
        <Tabs.List>
          <Tabs.Trigger value="all">All matches</Tabs.Trigger>
          <Tabs.Trigger value="casual">Casual</Tabs.Trigger>
          <Tabs.Trigger value="ranked">Ranked</Tabs.Trigger>
          <Tabs.Trigger value="private">Private</Tabs.Trigger>
          <Tabs.Trigger value="event">Event</Tabs.Trigger>
        </Tabs.List>
        <ScrollArea
          type="always"
          scrollbars="vertical"
          style={{ maxHeight: "800px" }}>
          <Flex py="3" justify="center">
            <Tabs.Content value="all">
              <MatchTable matchType={null} />
            </Tabs.Content>
            <Tabs.Content value="casual">
              <MatchTable matchType={1} />
            </Tabs.Content>
            <Tabs.Content value="ranked">
              <MatchTable matchType={2} />
            </Tabs.Content>
            <Tabs.Content value="private">
              <MatchTable matchType={3} />
            </Tabs.Content>
            <Tabs.Content value="event">
              <MatchTable matchType={4} />
            </Tabs.Content>
          </Flex>
          <Flex py="3" justify="center">
            <Button onClick={() => setSize(prev => prev + 1)}>
              Load more...
            </Button>
          </Flex>
        </ScrollArea>
      </Tabs.Root>
    </Card>
  );
}
