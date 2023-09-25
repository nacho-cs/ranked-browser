import { HoverCard } from "@radix-ui/themes";
import { DetailedMatchCard } from "./DetailedMatchCard";

export function HoverDetailedMatchCard({ id, children }) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>{children}</HoverCard.Trigger>
      <HoverCard.Content>
        <DetailedMatchCard id={id} style="ghost" />
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
