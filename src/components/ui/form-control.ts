import { cva, type VariantProps } from "class-variance-authority";

// Keep field surfaces and density consistent in editors and filter toolbars.
export const formControlVariants = cva(
	"w-full min-w-0 rounded-lg border border-input bg-background px-3 text-sm text-foreground leading-relaxed shadow-none outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20",
	{
		variants: {
			density: {
				default: "min-h-11 py-2 sm:min-h-10 sm:py-1.5",
				compact: "min-h-11 py-1 sm:min-h-9",
			},
		},
		defaultVariants: { density: "default" },
	},
);

export type FormControlProps = VariantProps<typeof formControlVariants>;
