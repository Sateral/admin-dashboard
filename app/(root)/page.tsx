"use client";

import { useEffect } from "react";

import { useCategoryModal } from "@/hooks/use-category-modal";

const SetupPage = () => {
  const onOpen = useCategoryModal((state) => state.onOpen);
  const isOpen = useCategoryModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <div className="p-4">Root Page</div>;
};

export default SetupPage;
