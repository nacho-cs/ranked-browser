import { StackedBarChart } from "./StackedBarChart.jsx";
import useSWR from "swr";
import { Card, Flex, Heading, Text,  } from "@radix-ui/themes";
import { Loading } from "./Loading.jsx";
import { fetcher, relativeTime } from "../utils";
import { capitalCase } from "capital-case";
import { PlayerInfo } from "./PlayerInfo.jsx";

export function DetailedMatchCard({ id, style }) {
  const { data, isLoading } = useSWR(
    `https://mcsrranked.com/api/matches/${id}`,
    fetcher
  );

  if (isLoading) return <Loading />;
  const { data: match } = data;

  return (
    <Card style={{ width: "fit-content" }} variant={style}>
      <Heading>
        {capitalCase(match.seed_type)}
        <Text as="span" color="gray">
          {" • "}
          {relativeTime(new Date(match.match_date * 1000))}
        </Text>
      </Heading>
      <Flex align="center" my="3">
        <PlayerInfo player={match.members[0].nickname} />
        <StackedBarChart id={id} />
      </Flex>
      <Flex align="center" my="3">
        <PlayerInfo player={match.members[1].nickname} />
        <StackedBarChart id={id} showSecondMember />
      </Flex>
    </Card>
  );
}
