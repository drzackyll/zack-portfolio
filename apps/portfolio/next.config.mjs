import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    // Static export has no image-optimization server.
    unoptimized: true,
  },
  transpilePackages: ["@zyne/ui"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
