"use client";

import React, { useState } from "react";
import {
  Button,
  Image,
  Card,
  CardBody,
  CardFooter,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
  Divider,
} from "@nextui-org/react";
import {
  ImageOrientation,
  ImageType,
  ORIENTATIONS,
  TYPES,
} from "@model/index";
import ImageModal from "@component/image-modal";
import { useImageGeneration } from "@hook/useImageGeneration";

export default function Page() {
  const generation = useImageGeneration();
  const [selected, setSelected] = useState<string>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const selectImage = (index: number) => {
    console.log(`selected image #${index}`);
    setSelected(generation.images[index]);
    onOpen();
  };

  return (
    <main className="bg-white min-h-screen text-black p-5">
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-2 justify-between items-center">
            <div className="flex-grow p-x-4 my-4">
              <Textarea
                placeholder="Enter your prompt here"
                width="100%"
                value={generation.prompt}
                onChange={(e) => generation.setPrompt(e.target.value)}
              />
            </div>
            <div className="flex my-4">
              <Button
                color="primary"
                disabled={generation.running}
                onClick={generation.generateImages}
              >
                {generation.running ? "Generating..." : "Generate Images"}
              </Button>
            </div>
          </div>
          <div className="w-1/4 grid grid-cols-2 gap-2">
            <Select
              label="Tipo de imagen"
              placeholder="Selecciona uno"
              items={TYPES}
              defaultSelectedKeys={["postcard"]}
              onChange={(e) =>
                generation.setImageType(e.target.value as ImageType)
              }
            >
              {(type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              )}
            </Select>
            <Select
              label="Orientación"
              placeholder="Selecciona uno"
              items={ORIENTATIONS}
              defaultSelectedKeys={["portrait"]}
              onChange={(e) =>
                generation.setOrientation(e.target.value as ImageOrientation)
              }
            >
              {(orientation) => (
                <SelectItem key={orientation.value}>
                  {orientation.label}
                </SelectItem>
              )}
            </Select>
            <Select
              label="Número de ejemplos"
              placeholder="Selecciona uno"
              className="max-w-xs"
              items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((it) => ({
                label: `${it}`,
                value: `${it}`,
              }))}
              defaultSelectedKeys={["4"]}
              onChange={(e) =>
                generation.setNumberOfExamples(parseInt(e.target.value))
              }
            >
              {(count) => (
                <SelectItem key={count.value}>{count.label}</SelectItem>
              )}
            </Select>
          </div>
        </div>
        <Divider className="mt-5" />
        <div className="border-dotted border-2 w-full gap-2 grid grid-cols-4 grid-rows-2 px-8">
          {generation.images.map((img, index) => (
            <div className="w-full aspect-auto" key={"img-" + index}>
              <Card
                shadow="sm"
                key={"card-" + index}
                isPressable
                onPress={() => selectImage(index)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    removeWrapper
                    className="z-0 w-full h-full object-cover"
                    alt={`Generated image ${index + 1}`}
                    src={`data:image/jpeg;base64,${img}`}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{`Generated image`}</b>
                  <p className="text-default-500">{index + 1}</p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>
      <ImageModal
        imageSrc={selected}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </main>
  );
}
