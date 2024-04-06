import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";

type ImageModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc?: string; // Propiedad adicional para la imagen
};

export default function ImageModal(props: Readonly<ImageModalProps>) {
  const { imageSrc, isOpen, onOpenChange } = props;

  console.log("imageSrc", imageSrc);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="h-5/6 min-w-fit whatever">
        {(onClose) => (
          <>
            <ModalHeader>Image preview</ModalHeader>
            <ModalBody className="flex justify-center items-center overflow-y-clip p-4">
              {imageSrc && (
                <div className="h-full aspect-auto">
                  <Image
                    removeWrapper
                    src={`data:image/png;base64,${imageSrc}`}
                    alt="Full Size"
                    className="z-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
