import { NavBar } from "../components/NavBar";
import { Leaderboard } from "../components/Leaderboard";
import { Flex, Heading } from "@radix-ui/themes";

export function PlayerLeaderboard() {
  return (
    <>
      <NavBar  />
      <Flex
        align="center"
        direction="column"
        gap="5"
        py="7"
        px="9">
        <Heading as="h4" weight="regular">
          Player Leaderboard:
        </Heading>
        <Leaderboard />
      </Flex>
    </>
  );
}
