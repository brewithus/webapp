import ProductCard from "./productCard"
import styles from "../styles/ProductList.module.css";
import menu from "../mock_data/cofeeShopData.json"
const ProductList = ({ coffeeShopId }) => {
    const coffeeShop = menu.find(shop => shop.id === coffeeShopId);

    if (!coffeeShop) {
        return <div>Coffee shop not found</div>;
    }
    return (
        <div className={styles.container}>
            <p className={styles.desc}>
            Menu
            </p>
            <div className={styles.wrapper}>
            {coffeeShop.menuItems.map((product) => (
                    <ProductCard 
                        imgNo={product.id} 
                        title={product.name} 
                        desc={product.description} 
                        price={product.price} 
                    />
                ))}

            </div>
        </div>
    )
}
export default ProductList