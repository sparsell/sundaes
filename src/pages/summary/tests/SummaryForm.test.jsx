import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SummaryForm from '../SummaryForm';

describe('SummaryForm', () => {
    it('finds an unchecked checkbox', () => {
      render(<SummaryForm />);
      const checkbox = screen.getByRole('checkbox', { name: /i agree to/i});
      expect(checkbox).not.toBeChecked();
    });

    it('finds a disabled button', () => {
      render(<SummaryForm />);
      const confirmButton = screen.getByRole('button', { name: /confirm order/i })
      expect(confirmButton).toBeDisabled();
    });

    it('enables the button on first click and disables button on second click', async () => {
        const user = userEvent.setup();
      
      render(<SummaryForm />);
        const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i});
        const confirmButton = screen.getByRole('button', { name: /confirm order/i });


         expect(confirmButton).toBeDisabled();
        await user.click(checkbox);

        expect(confirmButton).toBeEnabled();

       await user.click(checkbox);
        expect(confirmButton).toBeDisabled();
    });

    it('popover responds to hover', async () => {
      const user = userEvent.setup();
      render(<SummaryForm />);

      //popover starts out hidden
      const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);

      // expect(nullPopover).toBeNull();
      expect(nullPopover).not.toBeInTheDocument();

      //appears when we mouse over the checkbox label
        const termsAndConditions = screen.getByText(/terms and conditions/i);
        await user.hover(termsAndConditions);
        const popover = screen.getByText(/no ice cream will actually be delivered/i);
        expect(popover).toBeInTheDocument();
        
      //disappear when we mouse out
        await user.unhover(termsAndConditions);
        expect(popover).not.toBeInTheDocument();

    });

});