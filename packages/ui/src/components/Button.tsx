import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { ButtonHTMLAttributes } from 'react';

export const buttonVariants = cva(
  'cursor-pointer border border-black rounded-full px-4 py-1.5',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        text: '',
        success: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ref?: React.Ref<HTMLButtonElement>;
}

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}