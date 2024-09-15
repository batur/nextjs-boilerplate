import withBundleAnalyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';
import { env } from './env.js/index.js';

/** @type {import('next').NextConfig} */

const nextConfig = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
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
});

export default nextConfig;
