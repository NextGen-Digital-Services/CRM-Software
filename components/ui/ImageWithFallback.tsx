"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80";

export function ImageWithFallback({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <Image
      src={hasError ? fallbackSrc : imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        setHasError(true);
        setImgSrc(fallbackSrc);
      }}
      {...props}
    />
  );
}
