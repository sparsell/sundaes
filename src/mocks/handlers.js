import { rest } from 'msw';

export const handlers = [
  rest.get("http://localhost:3000/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png'}, 
        { name: 'Vanilla', imagePath: '/images/vanilla.png'}
      ])
    )
  }),

  rest.get("http://localhost:3000/toppings", (req, res, ct) => {
    return res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-m-s.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
      ])
    )
  }),
];