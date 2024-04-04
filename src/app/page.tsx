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
  ImageOptions,
  ImageOrientation,
  ImageProposal,
  ImageType,
  ORIENTATIONS,
  RequestValidator,
  TYPES,
} from "@model/index";
import ImageModal from "@component/image-modal";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [imageType, setImageType] = useState<ImageType>('postcard');
  const [orientation, setOrientation] = useState<ImageOrientation>('portrait');
  const [numberOfExamples, setNumberOfExamples] = useState<number>(4);
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleGenerateImages = async () => {
    try {
      const options = generateSize(imageType, orientation);
      const body = RequestValidator.parse({
        prompt,
        width: options.size.width,
        height: options.size.height,
        samples: numberOfExamples,
      });
      console.log(body);
      const response = await fetch("http://localhost:8080/generate-image", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ImageProposal = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error(error);
      setImages([]);
    }
  };

  const generateSize = (
    type?: ImageType,
    orientation?: ImageOrientation
  ): ImageOptions => {
    const selectedType = TYPES.find((t) => t.value === type);

    if (!selectedType) {
      return {
        type: 'postcard',
        size: { width: 591, height: 399 },
        orientation: 'landscape',
      };
    }

    const { width, height } = selectedType.size;
    return {
      type: selectedType.value,
      size: orientation === 'portrait' ? selectedType.size : {width: height, height: width},
      orientation: orientation ?? 'portrait'
    };
  }

  const selectImage = (index: number) => {
    console.log(`selected image #${index}`);
    setSelected(images[index]);
    onOpen();
  };

  return (
    <main>
      <section className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-2 justify-between items-center">
            <div className="flex-grow p-x-4 my-4">
              <Textarea
                placeholder="Enter your prompt here"
                width="100%"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="flex my-4">
              <Button color="primary" onClick={handleGenerateImages}>
                Generate Images
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select
              label="Tipo de imagen"
              placeholder="Selecciona uno"
              items={TYPES}
              defaultSelectedKeys={["postcard"]}
              onChange={(e) => setImageType(e.target.value as ImageType)}
            >
              {(type) => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>}
            </Select>
            <Select
              label="Orientación"
              placeholder="Selecciona uno"
              items={ORIENTATIONS}
              defaultSelectedKeys={["portrait"]}
              onChange={(e) => setOrientation(e.target.value as ImageOrientation)}
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
              defaultSelectedKeys={["4"]}
              onChange={(e) => setNumberOfExamples(parseInt(e.target.value))}
            >
              <SelectItem key={4} textValue={`4`}>
                4
              </SelectItem>
              <SelectItem key={8} textValue={`8`}>
                8
              </SelectItem>
              <SelectItem key={12} textValue={`12`}>
                12
              </SelectItem>
              <SelectItem key={16} textValue={`16`}>
                16
              </SelectItem>
              <SelectItem key={20} textValue={`20`}>
                20
              </SelectItem>
            </Select>
          </div>
        </div>
        <Divider className="mt-5"/>
        <div className="border-dotted border-2 mt-5 grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <div className="w-full aspect-auto" key={"img-" + index}>
              <Card
                shadow="sm"
                key={"card-" + index}
                isPressable
                onPress={() => selectImage(index)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={`Generated image ${index + 1}`}
                    className="w-full object-cover h-[140px]"
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
