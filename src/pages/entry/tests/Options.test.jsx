import { render, screen } from '@testing-library/react';
import Options from '../Options';

test('it displays an image for each scoop from the server', async () => {
  render(<Options optionType="scoops"/>);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);

});