import { LineChart } from "../components/LineChart";
import { MatchList } from "../components/MatchList";
import { PlayerStats } from "../components/PlayerStats";
import { NavBar } from "../components/NavBar";
import { Flex } from "@radix-ui/themes";

export function Player({ player }) {
  return (
    <>
      <NavBar />
      <Flex justify="between" px="9" py="7" gap="5">
        <MatchList player={player} />
        <Flex direction="column" gap="5">
          <PlayerStats player={player} />
          <LineChart player={player} />
        </Flex>
      </Flex>
    </>
  );
}
