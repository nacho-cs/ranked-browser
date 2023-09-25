import { Flex, Heading, Text, Link, Box } from "@radix-ui/themes";
import { SearchBar } from "./SearchBar.jsx";

export function NavBar() {
  const items = [
    {
      href: "https://github.com/nacho-cs/nacho-cs.github.io",
      text: "GitHub",
    },
    {
      href: "https://github.com/nacho-cs/nacho-cs.github.io/issues",
      text: "Bugs",
    },
    {
      href: "https://github.com/nacho-cs/nacho-cs.github.io/pulls",
      text: "Contribute",
    },
  ];

  return (
    <Box style={{ borderBottom: "1px solid #3d3840" }}>
      <Flex align="center" justify="between" px="5" py="3">
        <Heading as="h3" weight="medium">
          Ranked Browser
        </Heading>
        <Flex align="center" justify="between" gap="5">
          {items.map(item => {
            return (
              <Link href={item.href}>
                <Text as="span">{item.text}</Text>
              </Link>
            );
          })}
          <SearchBar />
        </Flex>
      </Flex>
    </Box>
  );
}
