import React from "react";
import Image from "next/image";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

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
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded-xl px-6 py-3 gap-3 text-lg transition-all duration-300 hover:opacity-90 ${variantStyles[variant]} ${additionalTailwindClass} ${disabledStyles}`}
    >
      {iconLocation === "start" && IconComponent}
      <span>
        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : text}
      </span>
      {iconLocation === "end" && IconComponent}
    </button>
  );
};

export default CustomButton;
