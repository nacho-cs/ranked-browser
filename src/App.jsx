import "@radix-ui/themes/styles.css";
import "./assets/main.css";
import { Theme } from "@radix-ui/themes";
import {
  Landing,
  PlayerLeaderboard,
  RecordLeaderboard,
  Player,
  PlayerVs,
} from "./pages";
import { Route } from "wouter";

export function App() {
  return (
    <Theme
      appearance="dark"
      accentColor="purple"
      grayColor="mauve"
      radius="medium">
      <Route path="/">
        <Landing />
      </Route>
      <Route path="/leaderboard">
        <PlayerLeaderboard />
      </Route>
      <Route path="/match-leaderboard">
        <RecordLeaderboard />
      </Route>
      <Route path="/player/:player">{params => <Player {...params} />}</Route>
      <Route path="/player/:player1/vs/:player2">
        {params => <PlayerVs {...params} />}
      </Route>
    </Theme>
  );
}
