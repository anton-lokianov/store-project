import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../service/Store";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import CategoryNav from "../CategoryNav/CategoryNav";
import styles from "./Products.module.css";
import {
  resetSelectedCategory,
  setSelectedCategory,
} from "../../service/category-slice";
import { setProducts } from "../../service/product-slice";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: "70vw" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 1 },
  },
  exit: {
    y: "100vw",
    transition: { ease: "easeInOut" },
  },
};

const Products = () => {
  const products = useSelector(
    (state: RootState) => state.product.searchableProducts
  );
  const selected = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const dispatch = useDispatch();

  const handleCategorySelect = (categoryId: string) => {
    if (selected === categoryId) {
      dispatch(resetSelectedCategory());
    } else {
      dispatch(setSelectedCategory(categoryId));
    }
  };

  const filterProducts = selected
    ? products.filter((product) => product.categoryId === selected)
    : products;

  return (
    <div className={styles.productContainer}>
      <CategoryNav onCategorySelect={handleCategorySelect} />
      <div className={styles.products__title}>
        <h1>Products</h1>
      </div>
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit">
        <AnimatePresence>
          {filterProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
export default Products;
