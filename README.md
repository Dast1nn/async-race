This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

1 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

2. Set Up Redux
Create store/store.ts

Create slices/garageSlice.ts (you’ve already done this).

Wrap your app in <Provider store={store}> inside app/layout.tsx

3. Garage Page Logic
Fetch all cars from /garage

Animate cars with velocity/distance API logic

On race:

Start engines

Animate

Calculate race time

Update or create winner in /winners

Dispatch Redux actions (startRace, resetRace, setWinner, etc.)

4. Winners Page Logic
Fetch /winners?_page=1&_limit=10

For each winner, fetch car info (/garage/:id)

Display: ID | Color | Name | Wins | Best Time (in seconds)

Add pagination

5. State Persistence via Redux
All car states are in garageSlice

When user navigates back from Winners → Garage, previous race status, car list, and animation state persist.

6. Responsive Animation
Use vw units (translateX(90vw)) so cars always animate to the visible edge.

Confirm it works on window resize.

