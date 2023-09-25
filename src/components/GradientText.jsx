import { Text } from "@radix-ui/themes";

export function GradientText({ from, to, children }) {
  return (
    <Text
      as="span"
      style={{
        backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}>
      {children}
    </Text>
  );
}
