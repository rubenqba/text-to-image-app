import { z } from "zod";

export type ImageRequest = {
  prompt: string;
  width: number;
  height: number;
  samples: number;
};

export const RequestValidator = z.object({
  prompt: z.string(),
  width: z.number().min(320).max(1536).default(512),
  height: z.number().min(320).max(1536).default(512),
  samples: z.number().min(1).max(20).default(4),
});

export type ImageProposal = {
  images: string[];
};

export type ImageSize = {
  width: number;
  height: number;
};

export type ImageType = "postcard" | "flyer";
export type ImageOrientation = "portrait" | "landscape";

export type ImageOptions = {
  type: ImageType;
  size: ImageSize;
  orientation: ImageOrientation;
};

export type ImageOrientationDefinition = {
  label: string;
  value: ImageOrientation;
};
export const ORIENTATIONS: ImageOrientationDefinition[] = [
  { label: 'Portrait', value: 'portrait'},
  { label: 'Landscape', value: 'landscape'},
];

export type ImageTypeDefinition = {
  label: string;
  value: ImageType;
  size: ImageSize;
};
export const TYPES: ImageTypeDefinition[] = [
  { label: 'Postcard', value: 'postcard', size: {width: 682, height: 1024}},
  { label: 'Flyer', value: 'flyer', size: {width: 512, height: 722}},
];
