import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" ;
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[12px] border px-5 font-sans text-lg font-medium transition-[filter,transform,box-shadow,background-color,color] duration-300 ease-out outline-none hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#219ebc] focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "border-white/30 bg-[linear-gradient(180deg,#219ebc_0%,#219ebc_100%)] text-white shadow-sm hover:brightness-110",

    secondary:
      "border-transparent bg-white text-[#219ebc] shadow-sm hover:bg-[#219ebc]",

  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "min-h-9 px-4 text-sm",
    md: "min-h-[47px] px-5 py-3 text-[18px]",
    lg: "min-h-14 px-7 text-xl",
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}