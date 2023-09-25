import { fetcher, matchEvents } from "../utils";
import useSWR from "swr";
import { Loading } from "./Loading.jsx";
import { VisXYContainer, VisStackedBar, VisTooltip } from "@unovis/react";
import { StackedBar } from "@unovis/ts";
import { formatTime } from "../utils";

export function StackedBarChart({ id, showSecondMember }) {
  const { data, isLoading } = useSWR(
    `https://mcsrranked.com/api/matches/${id}`,
    fetcher
  );

  if (isLoading) return <Loading style="ghost" />;
  const {
    data: { timelines, members },
  } = data;

  const reversed = Array.from(timelines).reverse();

  const transformed = [{ name: "Start", time: 0, color: "#22c55e" }].concat(
    reversed
      .filter(event => Object.keys(matchEvents).includes(event.timeline))
      .filter(event =>
        showSecondMember
          ? members[1].uuid === event.uuid
          : members[0].uuid === event.uuid
      )
      .map(event => {
        return {
          name: matchEvents[event.timeline].name,
          time: event.time,
          color: matchEvents[event.timeline].color,
        };
      })
  );

  // super hacky code

  let newData = [{ x: 1 }];
  for (let i = 0; i < transformed.length; i++) {
    if (transformed[i].color === "prev") {
      transformed[i].color = transformed[i - 1].color;
    }

    newData[0][`y${i}`] = transformed[i].time;
    newData[0][`color${i}`] = transformed[i].color;
    newData[0][`name${i}`] = transformed[i].name;
  }

  const x = data => data.x;
  const y = Object.keys(newData[0])
    .filter(key => key.startsWith("y"))
    .map(key => data => data[key]);
  const color = (data, i) => {
    return data[`color${i}`];
  };
  const triggers = {
    [StackedBar.selectors.bar]: data => {
      const keys = Object.keys(newData[0]).filter(key => key.startsWith("y"));

      return `<table> ${keys
        .map((_, i) => {
          const color = data[`color${i}`];
          const time = data[`y${i}`];
          const name = data[`name${i}`];
          return `<tr> <td> <span style="color: ${color}">${name}</span> <td/> <td>${formatTime(
            new Date(time)
          )} </td> </tr>`;
        })
        .join(" ")} </table`;
    },
  };

  return (
    <VisXYContainer data={newData} height={20} width={400}>
      <VisStackedBar
        orientation="horizontal"
        x={x}
        y={y}
        roundedCorners={4}
        color={color}
      />
      <VisTooltip triggers={triggers} container={document.body} />
    </VisXYContainer>
  );
}
