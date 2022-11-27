
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
    handleClearItems: () => { },
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
       let  tempCartItems = cartItems;
        let index = tempCartItems.findIndex(el => el.Code === data.Code);
        if (index !== -1) {
            tempCartItems.map((el, i) => {
                if(i == index ) {
                    el.item_count = data.item_count
                }
                return el
            });
        } else {
            tempCartItems = [...cartItems, {...data, item_count: 1}]
        }
        setCartItems(tempCartItems);
    };

    const handleIncrement = (data: any) => {
        let tempCartItems = cartItems.map(item => {
            if (item.Code == data.Code && item.item_count + 1 <= data.Volume) {
                item.item_count += 1;
            };
            return item;
        });
        setCartItems(tempCartItems);
    };
    const handleDecrement = (data: any) => {
        let tempCartItems = cartItems.map(item => {
            if (item.Code == data.Code && item.item_count - 1 >= 1) {
                item.item_count -= 1;
            };
            return item;
        });
        setCartItems(tempCartItems);
    };

    const handleTotalCost = () => {
        let tempTotalCost = cartItems.reduce((cost, item) => {

            return cost += (item.item_count * item.RetilePRiceOFPremix);
        }, 0);

        setTotalCost(tempTotalCost);
    };

    const handleTotalItems = () => {
        let tempTotalItems = cartItems.reduce((itemCount, item) => {
            return itemCount += item.item_count;
        }, 0);
        setTotalItems(tempTotalItems)
    }

    const handleClearItems = () => setCartItems([]);

    useEffect(() => {
        handleTotalCost();
        handleTotalItems();
    }, [cartItems]);


    const ProductsCtx = {
        cartItems,
        handleAddItem,
        handleIncrement,
        handleDecrement,
        handleClearItems,
        totalCost,
        totalItems
    };


    return (
        <ProductsContext.Provider value={ProductsCtx}>
            {children}
        </ProductsContext.Provider>
    );
};

