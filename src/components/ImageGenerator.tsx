import { useGenerationStyles } from "@hook/useGenerationStyles";
import { useImageGeneration } from "@hook/useImageGeneration";
import {
  Textarea,
  Button,
  Divider,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import React from "react";
import SelectImageType from "./SelectImageType";
import SelectImageOrientation from "./SelectImageOrientation";
import SelectBatchSize from "./SelectBatchSize";
import SelectStyle from "./SelectStyle";

export type ImageGeneratorProps = {
  showImage: (content: string) => void;
  onOpen: () => void;
  className: string;
};

function ImageGenerator({
  onOpen,
  showImage,
  className,
}: Readonly<ImageGeneratorProps>) {
  const generation = useImageGeneration();
  const styles = useGenerationStyles();

  const selectImage = (index: number) => {
    console.log(`selected image #${index}`);
    showImage(generation.images[index]);
    onOpen();
  };

  return (
    <section className={className}>
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
        <div className="w-1/2 grid grid-cols-4 gap-2">
          <SelectImageType setImageType={generation.setImageType} />
          <SelectImageOrientation setOrientation={generation.setOrientation} />
          <SelectBatchSize setBatchSize={generation.setNumberOfExamples} />
          <SelectStyle setStyle={generation.setStyle} />
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
  );
}

export default ImageGenerator;
