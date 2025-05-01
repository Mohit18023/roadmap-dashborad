module.exports = {
    productionSourceMaps: false, // Disable source maps in production for better performance
  }
  
  /** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    
    // Add rule for pdf.worker
    config.module.rules.push({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource'
    });

    return config;
  },
  images: {
    domains: ['img.clerk.com'],
  },
}

module.exports = nextConfig
