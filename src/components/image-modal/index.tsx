import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

type ImageModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc?: string; // Propiedad adicional para la imagen
};

export default function ImageModal(props: Readonly<ImageModalProps>) {
  const { imageSrc, isOpen, onOpenChange } = props;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
              {imageSrc && (
                <img src={`data:image/jpeg;base64,${imageSrc}`} alt="Full Size" style={{ width: "100%" }} />
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
