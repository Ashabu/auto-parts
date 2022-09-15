
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Products } from './types';

type ContextProps = {
    children: ReactNode
}

const ProductsContext =createContext<Products>({
    cartItems: [],
    handleAddItem: () => { },
    handleIncrement: () => { },
    handleDecrement: () => { },
    totalCost: 0,
    totalItems: 0
});

export const useCartItems = ()=> {
    return useContext(ProductsContext)
}

export const ProductsProvider: React.FC<ContextProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);

    const handleAddItem = (data: any) => {
        let tempCartItems = cartItems;
        let index = tempCartItems.findIndex(el => el.id === data.id);
        if (index !== -1) {
            tempCartItems[index].item_count +=1
        } else {
            tempCartItems = [...cartItems, data]
        }
       console.log('tempCartItems ==> ', tempCartItems)
        setCartItems(tempCartItems);
    };

    const handleIncrement = (data: any) => {
        // if(item.stock_quantity)
        let tempCartItems = cartItems.map(item => {
            if (item.id == data.id && item.item_count + 1 <= data.stock_quantity) {
                item.item_count += 1;
            };
            return item;
        });
        setCartItems(tempCartItems);
    };
    const handleDecrement = (data: any) => {
        let tempCartItems = cartItems.map(item => {
            if (item.id == data.id && item.item_count - 1 >= 0) {
                item.item_count -= 1;
            };
            return item;
        });
        setCartItems(tempCartItems);
    };

    const handleTotalCost = () => {
        let tempTotalCost = cartItems.reduce((cost, item) => {
            return cost += (item.item_count * item.price);
        }, 0);

        setTotalCost(tempTotalCost);
    };

    const handleTotalItems = () => {
        let tempTotalItems = cartItems.reduce((itemCount, item) => {
            return itemCount += item.item_count;
        }, 0);
        setTotalItems(tempTotalItems)
    }

    useEffect(() => {
        handleTotalCost();
        handleTotalItems();
    }, [cartItems]);


    const ProductsCtx = {
        cartItems,
        handleAddItem,
        handleIncrement,
        handleDecrement,
        totalCost,
        totalItems
    };


    return (
        <ProductsContext.Provider value={ProductsCtx}>
            {children}
        </ProductsContext.Provider>
    );
};

