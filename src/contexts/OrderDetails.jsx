import { createContext, useContext, useState } from "react";
import { pricePerItem } from '../constants';

const OrderDetails = createContext();

// create custom hook to check wether we are in a provider

export function useOrderDetails() {
    const contextValue = useContext(OrderDetails)

    if (!contextValue) {
        throw new Error ("useOrderDetails must be called from within an OrderDetailsProvider"
        );
    }
    return contextValue
}

export function OrderDetailsProvider(props) {
    const [optionCount, setOptionCount] = useState({
        scoops: {}, // example: { Chololate: 1, Vanilla: 2 }
        toppings: {} // example: { "Gummi Bears": 1 }
    })

    function updateItemCount(itemName, newItemCount, optionType) {
        // copy of existing state
        const newOptionCount = {...optionCount};

        newOptionCount[optionType][itemName] = newItemCount;
        setOptionCount(newOptionCount)
    }

    function resetOrder() {
        setOptionCount({scoops: {}, toppings: {} });
    }

    // utility function
    function calculateTotal(optionType) {
        // get array of counts of optionType
        const countsArray = Object.values(optionCount[optionType])
        // total the values in the array of counts - give number of items
        const totalCount = countsArray.reduce((total, value) => total + value, 0);

        // get the cost
        return totalCount * pricePerItem[optionType];
    }

    const totals =  {
        scoops: calculateTotal("scoops"),
        toppings: calculateTotal("toppings"),
    };

    const value = { optionCount, totals, updateItemCount, resetOrder };
    return <OrderDetails.Provider value={value} {...props}/>;
}