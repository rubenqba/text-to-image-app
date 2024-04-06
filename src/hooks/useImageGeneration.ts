import { ImageType, ImageOrientation, ImageOptions, TYPES, RequestValidator, ImageProposal } from "@model/index";
import { useState } from "react";
import toast from "react-hot-toast";

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [imageType, setImageType] = useState<ImageType>("postcard");
  const [orientation, setOrientation] = useState<ImageOrientation>("portrait");
  const [numberOfExamples, setNumberOfExamples] = useState<number>(4);
  const [images, setImages] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  // functions
  const generateSize = (
    type?: ImageType,
    orientation?: ImageOrientation
  ): ImageOptions => {
    const selectedType = TYPES.find((t) => t.value === type);

    if (!selectedType) {
      return {
        type: "postcard",
        size: { width: 591, height: 399 },
        orientation: "landscape",
      };
    }

    const { width, height } = selectedType.size;
    return {
      type: selectedType.value,
      size:
        orientation === "portrait"
          ? selectedType.size
          : { width: height, height: width },
      orientation: orientation ?? "portrait",
    };
  };

  const generateImages = async () => {
    setImages([]);
    setRunning(true);

    try {
      const options = generateSize(imageType, orientation);
      const body = RequestValidator.parse({
        prompt,
        width: options.size.width,
        height: options.size.height,
        samples: numberOfExamples,
      });
      console.log(body);
      const response = await fetch("/api/v1/generate-image", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      toast.success(`Images generated successfully`);

      const data: ImageProposal = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error(error);
      toast.error(`Error generating images`);
      setImages([]);
    } finally {
      setRunning(false);
    }
  }

  return {
    prompt,
    setPrompt,
    imageType,
    setImageType,
    orientation,
    setOrientation,
    numberOfExamples,
    setNumberOfExamples,
    images,
    running,
    setImages,
    generateImages,
  };
}