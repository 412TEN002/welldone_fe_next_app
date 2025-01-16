"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import CustomOverlay from "@/components/overlay/CustomOverlay";

type Props = {
  children: ReactNode;
};

export default function CustomOverlayAction({ children }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const onClickOverlay = () => {
    setOpen(false);

    setTimeout(() => {
      router.back();
    }, 150);
  };

  return (
    <AnimatePresence>
      {open && <CustomOverlay onClickOverlay={onClickOverlay}>{children}</CustomOverlay>}
    </AnimatePresence>
  );
}
