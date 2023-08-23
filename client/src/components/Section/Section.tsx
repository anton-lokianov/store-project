import { useSelector } from "react-redux";
import styles from "./Section.module.css";
import { RootState } from "../../service/Store";
import useHttp from "../../hooks/useHttp";
import { useEffect, useRef, useState } from "react";
import { Product } from "../../models/Product";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Section = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const productsAmount = products.length;
  const { sendRequest } = useHttp();
  const [ordersAmount, setOrdersAmount] = useState(0);
  const [initializeCarousel, setInitializeCarousel] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitializeCarousel(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const randomProducts = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  const getOrdersAmount = async () => {
    try {
      const response = await sendRequest("get", "/order/orderAmount");
      setOrdersAmount(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrdersAmount();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Some of Our Products</h1>
      </div>

      {initializeCarousel && (
        <Carousel
          className={styles.carousel}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          interval={1700}>
          {randomProducts.map((product: Product) => (
            <img
              key={product._id}
              src={`http://localhost:4000/${product.imagePath}`}
              alt={product.productName}
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Section;
