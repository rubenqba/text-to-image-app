import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

export type SelectBatchSizeProps = {
  setBatchSize: (size: number) => void;
};

export default function SelectBatchSize({
  setBatchSize,
}: SelectBatchSizeProps) {
  return (
    <Select
      label="Número de ejemplos"
      placeholder="Selecciona uno"
      className="max-w-xs"
      items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((it) => ({
        label: `${it}`,
        value: `${it}`,
      }))}
      defaultSelectedKeys={["4"]}
      onChange={(e) => setBatchSize(parseInt(e.target.value))}
    >
      {(count) => <SelectItem key={count.value}>{count.label}</SelectItem>}
    </Select>
  );
}
