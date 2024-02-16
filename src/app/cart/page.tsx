"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from '@/styles/cart.module.css'
import { ST } from 'next/dist/shared/lib/utils';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { updateCart } from '@/redux/features/cart-slice';
interface CartItem {
    name: string;
    id: number;
    imagePath: string;
    price: number;
    description: string;
    quantity: number;

}

const page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartArray = useAppSelector((state) => state.cartReducer);



    const [cartItems, setCartItems] = React.useState<CartItem[]>([])

  
    useEffect(() => {
        setCartItems(cartArray)
    }, [cartArray])

    // const addToCart = (product: Product) => {
    //     console.log('add to cart', product);

    //     const itemIndex = cartArray.findIndex((item) => item.id === product.id);

    //     if (itemIndex !== -1) {
    //       // item is in cart
    //       // update the quantity
    //       const updatedCart = cartArray.map((item, index) =>
    //         index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
    //       );

    //       dispatch(updateCart(updatedCart));
    //     } else {
    //       // item is not in cart
    //       const newCartItem = {
    //         name: product.name,
    //         id: product.id,
    //         imagePath: product.imagePath,
    //         price: product.price,
    //         description: product.description,
    //         quantity: 1,
    //       };

    //       const updatedCart = [...cartArray, newCartItem];

    //       dispatch(updateCart(updatedCart));
    //     }
    //   }
    const incremntCartItem = (index: number) => {
        let tempCartItems = cartArray.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
        dispatch(updateCart(tempCartItems));
    }
    
    const decrementCartItem = (index: number) => {
        let tempCartItems = cartArray.map((item, i) =>
            i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        dispatch(updateCart(tempCartItems));
    }
    const removeCartItem = (index: number) => {
        let tempCartItems = [...cartArray];
        tempCartItems.splice(index, 1);
        dispatch(updateCart(tempCartItems));
    }
    return (
        <div className={styles.cartPage}>
            <h1 className={styles.cartHead}>Cart</h1>
            {
                cartItems.length === 0 ? <h1 className={styles.emptyCart}>Cart is empty</h1> : null
            }
            <div>
                {
                    cartItems.map((item, index) => (
                        <div key={index} className={styles.cartCard}>
                            <div className={styles.s1}>
                                <Image src={item.imagePath} alt={item.name} width={200} height={200} />
                                <h3>{item.name}</h3>
                            </div>
                            <div className={styles.s1}>
                                <h2>{item.price * item.quantity}</h2>
                                <div className={styles.incredecre}>
                                    <button
                                        onClick={() => {
                                            decrementCartItem(index)
                                        }}
                                    >-</button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => {
                                            incremntCartItem(index)
                                        }}
                                    >+</button>
                                </div>
                                <svg
                                    onClick={() => {
                                        removeCartItem(index)
                                    }}
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default page