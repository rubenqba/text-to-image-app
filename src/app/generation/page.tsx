"use client";

import React, { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import ImageModal from "@component/image-modal";
import ImageGenerator from "@component/ImageGenerator";

export default function GenerationPage() {
  const [selected, setSelected] = useState<string>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <main className="flex flex-1 border-dotted border-2 bg-white text-black p-5">
      <ImageGenerator
        className="w-full h-full"
        showImage={setSelected}
        onOpen={onOpen}
      />
      <ImageModal
        imageSrc={selected}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </main>
  );
}
