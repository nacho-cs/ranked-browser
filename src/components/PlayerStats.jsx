import {
  Card,
  Flex,
  Box,
  Text,
  Avatar,
  Heading,
  Link,
  Popover,
} from "@radix-ui/themes";
import { Discord, Youtube, Twitch, QuestionLg } from "react-bootstrap-icons";
import { Loading } from "./Loading.jsx";
import useSWR from "swr";
import { fetcher, formatTime, relativeTime, parseElo } from "../utils";
import { GradientText } from "./GradientText.jsx";

export function PlayerStats({ player, style }) {
  const { data, isLoading } = useSWR(
    `https://mcsrranked.com/api/users/${player}`,
    fetcher
  );

  if (isLoading) return <Loading style={style} />;
  const { data: stats } = data;
  const {
    rank,
    color: [from, to],
  } = parseElo(stats.elo_rate);

  return (
    <Card style={{ width: "fit-content" }} variant={style ?? "classic"}>
      <Flex gap="3" align="center" justify="between">
        <Avatar
          src={`https://mc-heads.net/head/${player}/`}
          radius="none"
          size="7"
          loading="lazy"
        />
        <Box>
          <Heading as="h4" weight="regular">
            <Text as="span" color="gray">
              {rank ? `#${stats.elo_rank}` : ""}
            </Text>
            {` ${player}`}
          </Heading>
          <Box>
            {rank ? (
              <>
                <GradientText from={from} to={to}>
                  {rank}
                </GradientText>{" "}
                (
                <GradientText from={from} to={to}>
                  {stats.elo_rate}
                </GradientText>
                )
              </>
            ) : (
              "Unranked"
            )}{" "}
            • {formatTime(new Date(stats.best_record_time))} pb
          </Box>
          <Box>
            {stats.current_winstreak} current winstreak • last online{" "}
            {relativeTime(new Date(stats.latest_time * 1000))}
          </Box>
          <Flex gap="3">
            {stats.connections.youtube ? (
              <Link
                href={`https://youtube.com/channel/${stats.connections.youtube.id}`}
                target="_blank">
                <Youtube size={24} />
              </Link>
            ) : null}
            {stats.connections.twitch ? (
              <Link
                href={`https://twitch.tv/${stats.connections.twitch.name}`}
                target="_blank">
                <Twitch size={24} />
              </Link>
            ) : null}
            {stats.connections.discord ? (
              <Discord
                size={24}
                onClick={() => alert(stats.connections.discord.name)}
              />
            ) : (
              <Popover.Root>
                <Popover.Trigger>
                  <QuestionLg size={24} />
                </Popover.Trigger>
                <Popover.Content>{player} is not verified</Popover.Content>
              </Popover.Root>
            )}
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
