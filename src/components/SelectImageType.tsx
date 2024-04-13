// SelectImageType.tsx
import { ImageType, ImageTypes } from "@model/test-to-image";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

type SelectImageTypeProps = {
  setImageType: (type: ImageType) => void;
};

const SelectImageType = ({ setImageType }: SelectImageTypeProps) => {
  // Estado para manejar el tipo de imagen seleccionado
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as ImageType;
    setImageType(value);
  };

  return (
    <Select
      label="Tipo de imagen"
      placeholder="Selecciona uno"
      items={Object.values(ImageTypes).map((type) => ({
        label: type,
        value: type,
      }))}
      defaultSelectedKeys={["POSTCARD"]}
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

export default SelectImageType;
