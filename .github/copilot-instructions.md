# Copilot Instructions for Next.js Boilerplate Project

## Project Overview

This is a modern Next.js boilerplate project built with Next.js 15, TypeScript, and Tailwind CSS. It includes a UI component library based on Radix UI primitives with Shadcn styling conventions, Storybook for component documentation, and various tools for testing and code quality.

## Key Features

- **Next.js App Router**: Utilizing the latest App Router architecture
- **TypeScript**: Full TypeScript support with strict type checking
- **Tailwind CSS**: Utility-first CSS with custom theme configuration
- **Shadcn UI Components**: Based on Radix UI primitives with consistent styling
- **TanStack Query**: For data fetching and state management
- **Storybook**: For component documentation and testing
- **Vitest**: For unit testing
- **ESLint & Prettier**: For code quality and formatting
- **Environment Management**: Using T3 Env
- **Docker Support**: For containerized deployment

## Project Structure

```
├── app/                   # Next.js App Router pages and layouts
├── components/            # UI components
│   ├── ui/                # Reusable UI components (Shadcn style)
│   └── Providers.tsx      # React Query provider setup
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and shared code
├── public/                # Static assets
├── styles/                # Global styles and Tailwind configuration
├── types/                 # TypeScript type definitions
├── scripts/               # Utility scripts for development
└── __tests__/             # Test files
```

## Component Structure

UI components follow a standardized structure:

- Each component has its own folder in `components/ui/`
- Component files are named `index.tsx`
- Storybook stories are named `index.stories.tsx`
- Components use Radix UI primitives with Tailwind styling
- All components are exported from the barrel file at `components/ui/index.ts`

## Development Guidelines

### Adding New Components

1. Create a new folder in `components/ui/` with the PascalCase name of your component
2. Create an `index.tsx` file for the component implementation
3. (Optional) Create an `index.stories.tsx` file for Storybook documentation
4. Export the component from `components/ui/index.ts`
5. Use the `yarn mv:ui` script to automatically handle component folder structure

### Styling

- Use Tailwind CSS for styling components
- Follow the design system in `styles/globals.scss` for colors, spacing, etc.
- Use the `cn()` utility from `@lib` for conditional class merging
- Ensure components are responsive and accessible

### Data Fetching

- Use TanStack Query for server state management
- The QueryClient is configured in `components/Providers.tsx`
- Implement custom hooks in the `hooks/` directory for reusable data fetching logic

### Environment Variables

- Add new environment variables to `env.mjs` using Zod for validation
- Access environment variables using the `env` object

### Testing

- Write unit tests in the `__tests__/` directory
- Use Cypress for end-to-end testing
- Use Storybook for component testing and documentation

### Scripts

- `yarn dev`: Start the development server with Turbopack
- `yarn build`: Build the production application
- `yarn lint`: Run ESLint
- `yarn prettier`: Run Prettier
- `yarn storybook`: Start Storybook development server
- `yarn mv:ui`: Script to handle component folder structure
- `yarn fix:imports`: Fix component imports
- `yarn docker:build`: Build Docker image
- `yarn docker:run`: Run Docker container

## Best Practices

- Follow the established component patterns for consistency
- Use TypeScript for type safety
- Keep components small, focused, and reusable
- Document components with Storybook stories
- Use semantic HTML and ensure accessibility
- Follow conventional commits for version control

## Project Configuration

- Next.js configuration is in `next.config.ts`
- Tailwind configuration is in `tailwind.config.js`
- TypeScript configuration is in `tsconfig.json`
- ESLint configuration is in `.eslintrc.json`
- Prettier configuration is in `.prettierrc`

## Deployment

- The project includes Docker configuration for containerized deployment
- The `next build` command generates a standalone output
- Environment variables should be properly configured in production
