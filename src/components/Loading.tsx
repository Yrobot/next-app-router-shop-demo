import cn from "classnames";

enum Size {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
}

function Loading({ size = Size.md }: { size?: `${Size}` }) {
  return (
    <span
      className={cn("loading loading-infinity", {
        "loading-xs": size === Size.xs,
        "loading-sm": size === Size.sm,
        "loading-md": size === Size.md,
        "loading-lg": size === Size.lg,
      })}
    />
  );
}

export default Loading;
