// export const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "BD"
//     }).format(price)
// }


export const formatPrice = (price: number) => {
    const currencySymbol = "৳"; 
   
    const formattedPrice = price !== undefined ? price.toFixed(2) : "0.00";
  
    return `${currencySymbol} ${formattedPrice}`;
  };
  