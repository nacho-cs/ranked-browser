import { Card, Flex, Avatar, Text, Link } from "@radix-ui/themes";
import { HoverPlayerStats } from "./HoverPlayerStats.jsx";

export function PlayerInfo({ player, avatarOnRight, winner, change }) {
  const color = winner ? "green" : winner === false ? "red" : "gray";
  const avatar = (
    <Avatar
      src={`https://mc-heads.net/avatar/${player}`}
      size="3"
      radius="none"
      loading="lazy"
    />
  );
  const text = (
    <Text
      as="span"
      color={color}
      onMouseEnter={e => {
        if (change) e.target.innerText = `${change} Elo`;
      }}
      onMouseLeave={e => {
        if (change) e.target.innerText = player;
      }}>
      {player}
    </Text>
  );

  return (
    <Card variant="ghost" style={{ width: "fit-content" }}>
      {avatarOnRight ? (
        <HoverPlayerStats player={player}>
          <Link href={`/player/${player}`}>
            <Flex gap="3" align="center">
              {text}
              {avatar}
            </Flex>
          </Link>
        </HoverPlayerStats>
      ) : (
        <HoverPlayerStats player={player}>
          <Link href={`/player/${player}`}>
            <Flex gap="3" align="center">
              {avatar}
              {text}
            </Flex>
          </Link>
        </HoverPlayerStats>
      )}
    </Card>
  );
}
