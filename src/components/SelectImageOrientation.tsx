// SelectImageOrientation.tsx
import { ImageOrientation, ImageOrientations } from "@model/test-to-image";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

type SelectImageOrientationProps = {
  setOrientation: (type: ImageOrientation) => void;
};

const SelectImageOrientation = ({
  setOrientation,
}: SelectImageOrientationProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as ImageOrientation;
    setOrientation(value);
  };

  return (
    <Select
      label="Orientación"
      placeholder="Selecciona uno"
      items={Object.values(ImageOrientations).map((type) => ({
        label: type,
        value: type,
      }))}
      defaultSelectedKeys={["PORTRAIT"]}
      onChange={handleChange}
    >
      {(type) => (
        <SelectItem key={type.value} value={type.value}>
          {type.label}
        </SelectItem>
      )}
    </Select>
  );
};

export default SelectImageOrientation;
