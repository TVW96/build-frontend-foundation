
import React from 'react';
import styles from './Grid.module.css';

type ProductListing = {
  listingTitle: string;
  sellerID: string;
  imageURL: string[];
  price: number;
  description: string;
};

function Grid({List}: {List: React.ReactNode[]}) {
  return (
    <div className={styles.grid}>
      {List.map((item, index) => (
        <div className={styles.gridItem} key={index}>
          {item}
        </div>
      ))}
    </div>
  )
}
export default Grid