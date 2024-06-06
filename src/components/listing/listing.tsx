import styles from "./listing.module.css"
import {FC} from 'react'
import { IListing } from "../types/IListing"
import { ITitles } from "../types/IGetPrcie"

export const Listing: FC<IListing> = (proops) => {
  const {items} = proops
  
  let titles:ITitles = {}

const getPrice = (price: string, currency_code: string)=>{
  let symbol;

  switch (currency_code) {
    case "USD":
      symbol = "$"
      break;
    case "EUR":
      symbol = '€'
      break;
    case "CAD":
      symbol = "C$"
      break;
    case "GBP":
      symbol = currency_code
      return `${price} ${symbol}`
  }
  return symbol + price
}

const getLevel = (quantity: number)=>{
  let class_;
  
  if(quantity <= 10) {
    class_ = "level-low" 
  } else if(quantity > 10 && quantity <= 20){
    class_ = "level-medium" 
  } else  class_ = "level-high" 

  return class_
}

const showFullTitle = (e: any, id: number)=>{
  let fullTitle = titles[id]
  e.currentTarget.textContent = fullTitle
}

const smallTitle = (title: string, id: number)=>{
  titles[id] = title;
  
  if(title.length > 50){
    let fiftySymbols = [];

    for (let i = 0; i < 50; i++) {
      fiftySymbols.push(title[i])
    }

    let threeDot = <span className={styles['threeDot']} onClick={(e)=>{showFullTitle(e, id)}}>...</span>
    return (<>{fiftySymbols.join('')} {threeDot}</>)  
  } 
  return title
}

return (
  <div className={styles["item-list"]}>

    {Array.from(Object.values(items)).map((item)=>{
      if(!item.title) return null;
      const {title, price, quantity, currency_code, listing_id} = item

      return(      
        <div className={styles["item"]} key={Math.random()}>
          <div className={styles["item-image"]}>
            <a href="https://www.etsy.com/listing/292754135/woodland-fairy">
              <img src={item.MainImage.url_570xN} alt='product photo'></img>
            </a>
          </div>
          <div className={styles["item-details"]}>
            <p className={styles["item-title"]}>{smallTitle(title, listing_id)}</p>
            <p className={styles["item-price"]}>{getPrice(price, currency_code)}</p>
            <p className={[styles["item-quantity"], styles[getLevel(quantity)]].join(" ")}>{quantity} left</p>
          </div>
        </div>)
    })}
  </div>  
  )
}
