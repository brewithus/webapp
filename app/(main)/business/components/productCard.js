import Image from "next/image";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ imgNo, title, desc, price}) => {
    return (
        <div className={styles.container}>
            <Image
                src={`/images/${imgNo}.jpg`}
                alt={title}
                width={500}
                height={100}
                layout="fixed"
            />
            <h1 className={styles.title}>{title}</h1>
            <span className={styles.price}>{price}</span>
            <p className={styles.desc}>
                {desc}
            </p>
        </div>
    )
}

export default ProductCard