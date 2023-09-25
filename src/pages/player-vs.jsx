import { MatchList } from "../components/MatchList";
import { PlayerStats } from "../components/PlayerStats";
import { NavBar } from "../components/NavBar";
import { Flex } from "@radix-ui/themes";

export function PlayerVs({ player1, player2 }) {
  return (
    <>
      <NavBar />
      <Flex justify="between" px="9" py="7" gap="5">
        <Flex direction="column" gap="5">
          <PlayerStats player={player1} />
          <PlayerStats player={player2} />
        </Flex>
        <MatchList player={player1} vs={player2} />
      </Flex>
    </>
  );
}
