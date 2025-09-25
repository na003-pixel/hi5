type ImageHeaderProps = {
  /** An object with explicit width and height in pixels. Generates `w-[width]px` and `h-[height]px` classes. */
  size?: {
    width: number;
    height: number;
  };
  /** A literal Tailwind max-width class string, e.g., 'max-w-2xl' or 'max-w-full'. Defaults to 'max-w-2xl'. */
  maxWidth?: string;
  /** A number corresponding to the Tailwind margin scale, e.g., 8 for 'mt-8'. Defaults to 8. */
  marginTop?: number;

  fill?: boolean;
};