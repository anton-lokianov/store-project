import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import styles from "./CategoryNav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../service/Store";
import { useLocation } from "react-router-dom";
import {
  resetSelectedCategory,
  setSelectedCategory,
} from "../../service/category-slice";

type CategoryProps = {
  onCategorySelect: (category: string) => void;
};

const CategoryNav: React.FC<CategoryProps> = ({ onCategorySelect }) => {
  const { sendRequest } = useHttp();
  const selected = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleCategoryClick = (categoryId: string) => {
    if (selected === categoryId) {
      dispatch(resetSelectedCategory());
      onCategorySelect("");
    } else {
      dispatch(setSelectedCategory(categoryId));
      onCategorySelect(categoryId);
    }
  };

  const getCategories = async () => {
    try {
      const response = await sendRequest("get", "/category/");
      setCategories(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(resetSelectedCategory());
    onCategorySelect("");
  }, [location.pathname, store.dispatch]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={styles.category__nav}>
      <ul>
        {categories.map((category: any) => (
          <li
            onClick={() => handleCategoryClick(category._id)}
            key={category._id}
            className={selected === category._id ? styles.active : ""}>
            {category.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryNav;
