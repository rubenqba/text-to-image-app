import {
  ImageType,
  ImageOrientation,
  DesignRequestValidator,
  DesignResponse,
} from "@model/test-to-image";
import { useState } from "react";
import toast from "react-hot-toast";

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [imageType, setImageType] = useState<ImageType>("POSTCARD");
  const [orientation, setOrientation] = useState<ImageOrientation>("PORTRAIT");
  const [numberOfExamples, setNumberOfExamples] = useState<number>(4);
  const [style, setStyle] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const generateImages = async () => {
    setImages([]);
    setRunning(true);

    try {
      const body = DesignRequestValidator.parse({
        prompt,
        options: {
          batchSize: numberOfExamples,
          style,
          purpose: imageType,
          orientation,
        },
      });
      console.log(body);
      const response = await fetch("/api/tti/generate", {
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

      const data: DesignResponse = await response.json();
      setImages(data.images);
    } catch (error) {
      console.error(error);
      toast.error(`Error generating images`);
      setImages([]);
    } finally {
      setRunning(false);
    }
  };

  return {
    prompt,
    setPrompt,
    imageType,
    setImageType,
    orientation,
    setOrientation,
    numberOfExamples,
    setNumberOfExamples,
    style,
    setStyle,
    images,
    running,
    setImages,
    generateImages,
  };
};
