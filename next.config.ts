// import withBundleAnalyzer from '@next/bundle-analyzer';
// import withPlugins from 'next-compose-plugins';
// import { env } from './env.mjs';
// These are the plugins we want to use but it is not working properly right now
// TODO: Fix this

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  eslint: {
    dirs: ['pages', 'components', 'lib', 'components', 'hooks', 'stories', '.storybook', '__tests__'],
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  env: {},
  cleanDistDir: true,
  compress: true,
  productionBrowserSourceMaps: true,
};

export default nextConfig;
