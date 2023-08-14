import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderEntry from '../OrderEntry';

it("handles errors for scoops and toppings routes", async () => {
    server.resetHandlers(
        rest.get('http://localhose:3030/scoops', (req, res, ctx) =>
            res(ctx.status(500))
        ),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => 
            res(ctx.status(500))
        ),    
);

    render(<OrderEntry />);
    // const alerts = await screen.findAllByRole('alert', {name: 'An unexpected error occurred. Please try again later.'})
    await waitForw(async () => {
        const alerts = await screen.findAllByRole('alert');
        expect(alerts).toHaveLength(2);
    });
});