import { NavBar } from "../components/NavBar";
import { MatchLeaderboard } from "../components/MatchLeaderboard";
import { Flex, Heading } from "@radix-ui/themes";

export function RecordLeaderboard() {
  return (
    <>
      <NavBar />
      <Flex align="center" direction="column" gap="5" py="7" px="9">
        <Heading as="h4" weight="regular">
          Match Leaderboard:
        </Heading>
        <MatchLeaderboard />
      </Flex>
    </>
  );
}
