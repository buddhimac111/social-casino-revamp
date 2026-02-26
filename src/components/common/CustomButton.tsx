import React from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface CustomButtonProps {
  text: string;
  icon?: string; // Lucide icon name or image path
  variant?: "bordered" | "full";
  isImage?: boolean;
  iconLocation?: "start" | "end";
  additionalTailwindClass?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
}

const variantStyles = {
  bordered:
    "border-2 border-main-green bg-transparent text-main-green font-semibold",
  full: "bg-main-green text-white font-semibold border-2 border-main-green",
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  variant = "full",
  isImage = false,
  iconLocation = "start",
  additionalTailwindClass = "",
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
}) => {
  let IconComponent: React.ReactNode = null;
  if (icon) {
    if (isImage) {
      IconComponent = (
        <Image src={icon} alt="icon" fill className="object-contain py-3" />
      );
    } else {
      const Icon = (Icons[icon as keyof typeof Icons] as LucideIcon) || null;
      IconComponent = Icon ? <Icon className="w-6 h-6" /> : null;
    }
  }

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={
        disabled
          ? {}
          : {
            scale: 1,
            y: -1,
            boxShadow:
              "0 6px 14px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.12)",
          }
      }
      whileTap={
        disabled
          ? {}
          : {
            scale: 1,
            y: 0,
            boxShadow:
              "0 4px 10px rgba(0, 0, 0, 0.14), 0 1px 4px rgba(0, 0, 0, 0.10)",
          }
      }
      transition={{ type: "tween", ease: "easeInOut", duration: 0.18 }}
      className={`flex items-center justify-center rounded-xl px-6 py-3 gap-3 text-lg transition-colors duration-150 ${variantStyles[variant]} ${additionalTailwindClass} ${disabledStyles}`}
    >
      {iconLocation === "start" && IconComponent}
      <span className="mb-0.5">
        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : text}
      </span>
      {iconLocation === "end" && IconComponent}
    </motion.button>
  );
};

export default CustomButton;
