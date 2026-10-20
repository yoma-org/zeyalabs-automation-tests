// src/constants/Routes.ts
export const Routes = {
  login: '/login',
  wall: '/wall',
  people: '/people',
  builder: '/builder',
  farewellPage: (slug: string) => `/p/${slug}`
} as const;
