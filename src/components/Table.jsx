import { Table as RadixTable } from "@radix-ui/themes";

export function Table({ data, headers }) {
  return (
    <RadixTable.Root variant="surface" style={{ width: "fit-content" }}>
      <RadixTable.Header>
        <RadixTable.Row>
          {headers.map(header => {
            return (
              <RadixTable.ColumnHeaderCell align="center">
                {header}
              </RadixTable.ColumnHeaderCell>
            );
          })}
        </RadixTable.Row>
      </RadixTable.Header>
      <RadixTable.Body>
        {data.map(arr => {
          return (
            <RadixTable.Row>
              {arr.map(entry => {
                return (
                  <RadixTable.Cell
                    style={{ verticalAlign: "middle", textAlign: "center" }}>
                    {entry}
                  </RadixTable.Cell>
                );
              })}
            </RadixTable.Row>
          );
        })}
      </RadixTable.Body>
    </RadixTable.Root>
  );
}
