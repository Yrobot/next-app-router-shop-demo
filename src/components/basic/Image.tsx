import React, { useMemo } from "react";
import Image, { ImageProps } from "next/image";

// src: xxx/$name_$wx$h.ext
function IMG({ src, ...props }: ImageProps) {
  const [width, height] = useMemo(() => {
    const [_, w, h] = /\w+_(\d+)x(\d+)\.\w+$/g.exec(`${src}`) || [];
    return [w, h].map((x) => parseInt(x, 10) ?? 0);
  }, [src]);
  return <Image src={src} width={width} height={height} {...props} />;
}

export default IMG;
