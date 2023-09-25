import { MATCHES_PLAYED } from "../utils";
import { GradientText } from "../components/GradientText";
import { NavBar } from "../components/NavBar";
import { PlayerStats } from "../components/PlayerStats";
import { Flex, Heading, Box, Grid } from "@radix-ui/themes";
import { BasicMatchCard } from "../components/BasicMatchCard";

export function Landing() {
  const recentMatches = [
    523831, 523830, 523829, 523828, 523827, 523826, 523825, 523824, 523823,
  ];

  return (
    <>
      <NavBar />
      <Flex justify="between" px="9" py="7">
        <Flex direction="column" gap="5">
          <Heading style={{ fontSize: "80px", lineHeight: "80px" }}>
            Over{" "}
            <GradientText from="lightblue" to="cornflowerblue">
              {MATCHES_PLAYED} <br />
            </GradientText>
            Matches Played
          </Heading>
          <Heading as="h5" weight="regular" color="gray">
            Explore the entire MCSR Ranked API with one search.
          </Heading>
        </Flex>
        <Flex direction="column" gap="5">
          <PlayerStats player="Ancoboyy" />
          <Box style={{ transform: "translate(-50%, 0)" }}>
            <PlayerStats player="lowk3y_" />
          </Box>
        </Flex>
      </Flex>
      <Heading as="h4" mx="9" my="7">
        Recent Matches:
      </Heading>
      <Grid columns="3" rows="2" px="9" gap="7">
        {recentMatches.map(id => (
          <BasicMatchCard id={id} />
        ))}
      </Grid>
    </>
  );
}
