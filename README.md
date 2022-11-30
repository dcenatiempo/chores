This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# TODO - MVP Functionality

1. ~~add rooms/roomTypes/levels to scheduledChore~~
1. add rooms/roomTypes/levels to scheduledTask
1. ~~show recurring chores in chore feed~~
1. ~~add history chores~~
1. ~~marking a chore task will change the scheduled task to a history chore~~
1. ~~merge history chores into chore feed~~
1. ~~filter out scheduled chores that have a history chore~~
1. safe deleting (prevent deletes, or recursive deletes)

# TODO - Tech Debt

- testing
- better organization of files/code
- dates/times

# TODO - Post MVP Features

- parent approval of task/chore completion
- rewards tied to chores / points tied to chores
- custom actions, surfaces, room types
- account creation
- reports (chore history)
- time zones
- multi orgs

# TODO - UI/UX

- hover states
- better filtering
- persistent cache
- ~~better dropdowns~~
- ~~better multiselect~~
- ~~calendar controls (change range of calendar)~~
- editing stuff on the fly
- mobile friendly
- improved calendar
- animations
