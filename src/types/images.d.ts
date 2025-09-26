// Image module declarations for TypeScript
// Put this file under `src/` so it's picked up by tsconfig (include: ["src"]).

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

// For SVGs treated as file paths (if you import SVGs as React components, add a separate declaration)
declare module '*.svg' {
  const src: string;
  export default src;
}
