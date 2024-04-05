# syntax = docker/dockerfile:1

FROM node:20-alpine AS base

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY public ./public
COPY .next/standalone ./
COPY .next/static ./.next/static

# Set the correct permission for prerender cache
RUN chown nextjs:nodejs .next

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js

