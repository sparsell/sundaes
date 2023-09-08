import {
    render,
    screen
  } from "../../../test-utils/testing-library-utils";
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

describe("check subtotals", () => {
test("update scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="scoops" />);
    
    // make sure total starts at $0.00
        const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
        expect(scoopSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1, and check subtotal
        const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });

        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        expect(scoopSubtotal).toHaveTextContent("2.00");
    // update chocolate scoops to 2, check subtotal
        const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });

        await user.clear(chocolateInput);
        await user.type(chocolateInput, "2");

        expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);

    // check start is 0.00
    const toppingSubtotal = screen.getByText("Toppings total: $", { exact: false });
    expect(toppingSubtotal).toHaveTextContent("0.00");

    // update cherries to 1
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
    await user.click(cherriesCheckbox);
    
    expect(toppingSubtotal).toHaveTextContent("1.50");

    // update M&Ms to 2
    const mandmsCheckbox = await screen.findByRole("checkbox", { name: "M&Ms"});
    await user.click(mandmsCheckbox);

    expect(toppingSubtotal).toHaveTextContent("3.00")

    // remove cherries and check subtotal
    await user.click(mandmsCheckbox);
    
    expect(toppingSubtotal).toHaveTextContent("1.50");
    });
})
