import { VisXYContainer, VisLine, VisAxis, VisGroupedBar } from "@unovis/react";
import useSWR from "swr";
import { Loading } from "./Loading.jsx";
import { fetcher, formatTime, matchesAtom } from "../utils";
import { Card, Tabs, Box } from "@radix-ui/themes";
import { useAtom } from "jotai";

export function LineChart({ player }) {
  const playerStats = useSWR(
    `https://mcsrranked.com/api/users/${player}`,
    fetcher
  );

  if (playerStats.isLoading) return <Loading style="ghost" />;
  const [matches] = useAtom(matchesAtom);
  const { data: stats } = playerStats.data;
  const style = {
    "--vis-axis-grid-color": "#3d3840",
    "--vis-axis-tick-color": "#3d3840",
  };

  const reversed = Array.from(matches).reverse();

  const eloHistory = reversed
    .filter(match => match.match_type === 2)
    .map((match, i) => {
      const uuid = match.members.find(member => {
        return member.nickname === player;
      }).uuid;
      return {
        x: i + 1,
        y: match.score_changes.find(change => change.uuid === uuid).score,
      };
    });

  const durationHistory = reversed
    .filter(match => !match.forfeit)
    .map((match, i) => {
      return {
        x: i + 1,
        y: match.final_time,
      };
    });

  const wld = [
    {
      x: 1,
      y: stats.records[2].win,
    },
    { x: 2, y: stats.records[2].lose },
    { x: 3, y: stats.records[2].draw },
  ];

  return (
    <Card style={{ width: "fit-content" }}>
      <Tabs.Root defaultValue="elo">
        <Tabs.List>
          <Tabs.Trigger value="elo">Elo Graph</Tabs.Trigger>
          <Tabs.Trigger value="duration">Match Duration</Tabs.Trigger>
          <Tabs.Trigger value="wld">Win / Loss / Draw</Tabs.Trigger>
        </Tabs.List>
        <Box py="3">
          <Tabs.Content value="elo">
            <VisXYContainer
              data={eloHistory}
              height="600px"
              width="800px"
              style={style}>
              <VisLine
                x={d => d.x}
                y={d => d.y}
                curveType="linear"
                color="#fff"
              />
              <VisAxis type="y" label="Elo" numTicks={3} />
              <VisAxis type="x" label="Matches ago" numTicks={3} />
            </VisXYContainer>
          </Tabs.Content>
          <Tabs.Content value="duration">
            <VisXYContainer
              data={durationHistory}
              height="600px"
              width="800px"
              style={style}>
              <VisLine
                x={d => d.x}
                y={d => d.y}
                curveType="linear"
                color="#fff"
              />
              <VisAxis
                type="y"
                label="Match duration"
                numTicks={3}
                tickFormat={tick => formatTime(new Date(tick))}
              />
            </VisXYContainer>
          </Tabs.Content>
          <Tabs.Content value="wld">
            <VisXYContainer
              data={wld}
              width="800px"
              height="600px"
              style={style}>
              <VisGroupedBar
                x={d => d.x}
                y={d => d.y}
                color={d => {
                  return {
                    1: "#46a758",
                    2: "#e5484d",
                    3: "#0091ff",
                  }[d.x];
                }}
              />
              <VisAxis type="y" numTicks={3} label="Amount of matches" />
            </VisXYContainer>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Card>
  );
}
