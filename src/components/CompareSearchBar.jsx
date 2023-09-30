import { useState } from "preact/compat";
import { idx } from "../utils";
import { TextField, Button } from "@radix-ui/themes";
import { useLocation } from "wouter-preact";

export function CompareSearchBar({ player }) {
  const [search, setSearch] = useState("");
  const [, setLocation] = useLocation();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const [result] = idx.search(search).slice(0, 1);
        setLocation(`/player/${player}/vs/${result.item.name}`);
      }}>
      <TextField.Root size="3" radius="large"> 
        <TextField.Input
          placeholder="compare against player..."
          style={{ textAlign: "center" }}
          onChange={e => setSearch(e.target.value)}
        />
        <TextField.Slot>
          <Button size="1">Go</Button>
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
}
