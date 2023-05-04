import { render, screen } from '@testing-library/react';
import Toppings from '../Toppings'

test('it displays an image for each topping from the server', () => {
  render(<Toppings toppingType="toppings" />)

  const toppingImages = screen.getAllByRole('img', { name: '/topping/$/i' })
  expect(tommigImages).toHaveLength(3);

const altText = screen.toppingImages.map((element) => element.alt);
expect(altText).toEqual(['Cherries', 'M&Ms', 'Hot fudge']);

});