import { Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { PlayerInfo } from "./PlayerInfo.jsx";
import useSWR from "swr";
import { Loading } from "./Loading.jsx";
import { fetcher, formatTime, relativeTime } from "../utils";

export function BasicMatchCard({ id, style }) {
  const { data, isLoading } = useSWR(
    `https://mcsrranked.com/api/matches/${id}`,
    fetcher
  );

  if (isLoading) return <Loading />;
  const { data: match } = data;
  const didWin = uuid => uuid === match.winner;

  return (
      <Card style={{ width: "400px", paddingTop: "15px", paddingBottom: "15px" }} variant={style ?? "classic"}>
        <Flex gap="5" align="center" justify="between">
          <PlayerInfo
            player={match.members[0].nickname}
            winner={didWin(match.members[0].uuid)}
            change={
              match.score_changes.find(
                member => member.uuid === match.members[0].uuid
              ).change
            }
          />
          <Heading as="h4">VS</Heading>
          <PlayerInfo
            player={match.members[1].nickname}
            avatarOnRight
            winner={didWin(match.members[1].uuid)}
            change={
              match.score_changes.find(
                member => member.uuid === match.members[1].uuid
              ).change
            }
          />
        </Flex>
        <Separator size="4" my="3" />
        <Flex justify="center" align="center" direction="column" gap="3">
          <Text as="span">
            {match.forfeit ? (
              <i>Forfeit</i>
            ) : (
              `Match Time: ${formatTime(new Date(match.final_time))}`
            )}{" "}
            • {relativeTime(new Date(match.match_date * 1000))}
          </Text>
          <Text>
            Winner: {match.members.find(member => member.uuid === match.winner).nickname}
          </Text>
        </Flex>
      </Card>
  );
}
