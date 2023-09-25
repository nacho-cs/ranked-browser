import { HoverCard } from "@radix-ui/themes";
import { PlayerStats } from "./PlayerStats.jsx";

export function HoverPlayerStats({ player, children }) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>{children}</HoverCard.Trigger>
      <HoverCard.Content>
        <PlayerStats player={player} style="ghost" />
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
