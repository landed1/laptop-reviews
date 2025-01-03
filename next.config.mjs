//import remarkGfm from "remark-gfm";
//import createMDX from "@next/mdx";

const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    //mdxRs: true,
    //turbo: true,
  },
  // Allow .mdx extensions for files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? "/laptop-reviews/" : "",
  basePath: isProd ? "/laptop-reviews" : "",
  output: "export",
  distDir: "out",
};
/*
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    //remarkPlugins: [remarkGfm],
  },
});*/

// Combine MDX and Next.js config
//export default withMDX(nextConfig);
export default nextConfig;
