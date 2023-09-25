import { Card, Text } from "@radix-ui/themes";

export function Loading({ style }) {
  return (
    <Card style={{ width: "fit-content" }} variant={style}>
      <Text>Loading...</Text>
    </Card>
  );
}
