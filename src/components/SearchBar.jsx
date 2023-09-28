import { TextField, Button } from "@radix-ui/themes";
import { Search } from "react-bootstrap-icons";
import { useLocation } from "wouter-preact";
import { useRef } from "preact/compat";
import { searchAtom } from "../utils";
import { useAtom } from "jotai";

export function SearchBar() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useAtom(searchAtom);
  const inputRef = useRef();

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
          value={search}
          style={{ textAlign: "center" }}
          ref={inputRef}
          onChange={() => {
            setSearch(inputRef.current.value);
          }}
        />
        <TextField.Slot>
          <Button size="1">Go</Button>
        </TextField.Slot>
      </TextField.Root>
    </form>
  );
}
