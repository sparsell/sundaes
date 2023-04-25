import { rest } from 'msw';

export const handlers = [
  rest.get("http://localhost:3000/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png'}, 
        { name: 'vanilla', imagePath: '/images/vanilla.png'}
      ])
    )
  }),
];