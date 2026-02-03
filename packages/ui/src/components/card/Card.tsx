import { cn, cva, VariantProps } from "@magic-dash/ui";
import { CardSubtitle } from "./CardSubtitle";
import { CardTitle } from "./CardTitle";

const cardVariants = cva(
  "rounded-lg p-5 border border-black",
  {
    variants: {
      open: {
        true: "",
      },
    },
    defaultVariants: {
      open: false,
    },
  }
);

export interface CardProps extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
  /** Whether the card is open/open */
  open?: boolean;
}

export function Card({
  children,
  className,
  open,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ open }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;