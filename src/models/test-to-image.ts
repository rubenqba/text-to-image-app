import { z } from "zod";

export const ImageTypes = {
  POSTCARD: "POSTCARD",
  BROCHURE: "BROCHURE",
  FLYER: "FLYER",
  LETTER: "LETTER",
} as const;

export type ImageType = (typeof ImageTypes)[keyof typeof ImageTypes];

export const ImageOrientations = {
  PORTRAIT: "PORTRAIT",
  LANDSCAPE: "LANDSCAPE",
};
export type ImageOrientation =
  (typeof ImageOrientations)[keyof typeof ImageOrientations];

export type ImageOptions = {
  batchSize: number;
  style?: string;
  purpose?: ImageType;
  orientation?: ImageOrientation;
};

export type DesignRequest = {
  prompt: string;
  options: ImageOptions;
};
const ImageOptionsValidator = z.object({
  batchSize: z.number().min(1).max(10).default(1),
  style: z.string().optional().nullable(),
  purpose: z
    .enum(["POSTCARD", "BROCHURE", "FLYER", "LETTER"])
    .optional()
    .nullable(),
  orientation: z.enum(["PORTRAIT", "LANDSCAPE"]).optional().nullable(),
});
export const DesignRequestValidator = z.object({
  prompt: z.string(),
  options: ImageOptionsValidator,
});

export type DesignResponse = {
  images: string[];
};

export type DesignStyle = {
  key: string;
  label: string;
};
