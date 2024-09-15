import withPlugins from 'next-compose-plugins';
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */

const nextConfig = withPlugins([[withBundleAnalyzer({ enabled: false })]], {
  // enable or disable bundle analyzer
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    dirs: ['pages', 'components', 'lib', 'components', 'hooks', 'stories', '.storybook', '__tests__']
  },
  typescript: {
    tsconfigPath: './tsconfig.json'
  },
  env: {},
  cleanDistDir: true,
  compress: true,
  productionBrowserSourceMaps: true
});

export default nextConfig;
