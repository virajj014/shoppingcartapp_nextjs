"use client";
import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from '@/styles/productcard.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';
import { updateCart } from '@/redux/features/cart-slice';

interface Product {
    name: string;
    id: number;
    imagePath: string;
    price: number;
    description: string;

}
const page = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartArray = useAppSelector((state) => state.cartReducer);
    const products = [
        {
            name: 'Product 1',
            id: 1,
            imagePath: 'https://source.unsplash.com/random',
            price: 100,
            description: 'This is a description'
        },
        {
            name: 'Product 2',
            id: 2,
            imagePath: 'https://source.unsplash.com/random',
            price: 200,
            description: 'This is a description'
        },
        {
            name: 'Product 3',
            id: 3,
            imagePath: 'https://source.unsplash.com/random',
            price: 300,
            description: 'This is a description'
        },
        {
            name: 'Product 4',
            id: 4,
            imagePath: 'https://source.unsplash.com/random',
            price: 400,
            description: 'This is a description'
        },
        {
            name: 'Product 5',
            id: 5,
            imagePath: 'https://source.unsplash.com/random',
            price: 400,
            description: 'This is a description'
        },

    ]


    const addToCart = (product: Product) => {
        console.log('add to cart', product);
      
        const itemIndex = cartArray.findIndex((item) => item.id === product.id);
      
        if (itemIndex !== -1) {
          // item is in cart
          // update the quantity
          const updatedCart = cartArray.map((item, index) =>
            index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
          );
      
          dispatch(updateCart(updatedCart));
        } else {
          // item is not in cart
          const newCartItem = {
            name: product.name,
            id: product.id,
            imagePath: product.imagePath,
            price: product.price,
            description: product.description,
            quantity: 1,
          };
      
          const updatedCart = [...cartArray, newCartItem];
      
          dispatch(updateCart(updatedCart));
        }
      };


      useEffect(() => {
        console.log("cartArray", cartArray);
      }, [cartArray]);
      
    return (
        <div className={styles.productsContainer}>
            {
                products.map((product, index) => (
                    <div className={styles.productcard1}>
                        <Image src={product.imagePath} alt={product.name} width={200} height={200} />
                        <div className={styles.row}>
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                        </div>
                        <div className={styles.row1}>
                            <button>View</button>
                            <button
                                onClick={() => addToCart(product)}
                            >Add to Cart</button>
                        </div>

                    </div>
                ))
            }

            {
                products.map((product, index) => (
                    <div className={styles.productcard1}>
                        <Image src={product.imagePath} alt={product.name} width={200} height={200} />
                        <div className={styles.row}>
                            <h2>{product.name}</h2>
                            <p>{product.price}</p>
                        </div>
                        <div className={styles.row1}>
                            <button>View</button>
                            <button
                                onClick={() => addToCart(product)}
                            >Add to Cart</button>
                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default page