/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript - strict in production
  typescript: {
    ignoreBuildErrors: false, // Fail build on TypeScript errors
  },
  // ESLint - strict in production
  eslint: {
    ignoreDuringBuilds: false, // Fail build on ESLint errors
  },
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    unoptimized: false,
  },
  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"], // Keep error/warn for production debugging
    } : false,
  },
  // Optimize package imports
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"],
  },
  // Exclude server-only modules from client bundle
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        dns: false,
        tls: false,
        child_process: false,
      }
    }
    // Fix for webpack chunk loading issues
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
    }
    // Ignore problematic modules in client bundle
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^nodemailer$/,
        contextRegExp: /^\.$/,
      })
    )
    return config
  },
  // Security headers
  // Security & PWA headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
        ],
      },
    ]
  },
}

export default nextConfig
