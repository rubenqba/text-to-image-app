import { useGenerationStyles } from "@hook/useGenerationStyles";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

export type SelectStyleProps = {
  setStyle: (style: string) => void;
};

export default function SelectStyle({ setStyle }: SelectStyleProps) {
  const styles = useGenerationStyles();
  return (
    <Select
      label="Estilos de imagen"
      placeholder="Selecciona uno"
      className="max-w-xs"
      items={styles.styles}
      onChange={(e) => setStyle(e.target.value)}
    >
      {(style) => <SelectItem key={style.key}>{style.label}</SelectItem>}
    </Select>
  );
}
