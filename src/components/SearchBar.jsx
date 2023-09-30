import { TextField, Button } from "@radix-ui/themes";
import { Search } from "react-bootstrap-icons";
import { useLocation } from "wouter-preact";
import { useState } from "preact/compat";

export function SearchBar() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (search) {
          setLocation(`/search/${encodeURIComponent(search)}`);
        }
      }}>
      <TextField.Root size="3" radius="large">
        <TextField.Slot>
          <Search size={24} />
        </TextField.Slot>
        <TextField.Input
          placeholder="search anything..."
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
