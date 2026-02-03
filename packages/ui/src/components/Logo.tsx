import { LayoutDashboard } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const logoVariants = cva("flex font-semibold text-primary", {
  variants: {
    variant: {
      large:
        "flex-col items-center gap-2 sm:gap-3 text-3xl sm:text-4xl lg:text-5xl", // Responsive stacked logo
      small: "items-center gap-1.5 sm:gap-2 text-base sm:text-lg lg:text-xl", // Responsive horizontal logo
    },
  },
  defaultVariants: {
    variant: "small",
  },
});

interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

export function Logo({ variant, className }: LogoProps) {
  const iconSize =
    variant === "large"
      ? { mobile: 40, desktop: 48 }
      : { mobile: 20, desktop: 24 };

  return (
    <div className={cn(logoVariants({ variant }), className)}>
      {/* Mobile icon size */}
      <LayoutDashboard
        size={iconSize.mobile}
        className="sm:hidden text-primary"
      />
      {/* Desktop icon size */}
      <LayoutDashboard
        size={iconSize.desktop}
        className="hidden sm:block text-primary"
      />
      <span>MagicDash</span>
    </div>
  );
}
