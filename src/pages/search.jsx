import { idx } from "../utils";
import { NavBar } from "../components/NavBar";
import { Link, Separator, Flex, Text } from "@radix-ui/themes";

export function Search({ query }) {
  const results = idx.search(query).slice(0, 10);

  return (
    <>
      <NavBar />
      <Flex direction="column" gap="5" py="7" px="9">
        {results.map(result => {
          const { item } = result;
          return (
            <>
              <Text as="span" color="gray">{item.path}</Text>
              <Link href={item.path}>{item.name}</Link>
              <Separator size="4" />
            </>
          );
        })}
      </Flex>
    </>
  );
}
