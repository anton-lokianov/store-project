import styles from "./Hero.module.css";
import image from "../../assets/images/image1-removebg-preview.png";
const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <img src={image} alt="Supermarket Cart" />
      </div>
      <div className={styles.heroText}>
        <h1>Welcome to Super Store!</h1>
        <p>
          From farm-fresh produce to your favorite pantry essentials, find
          everything you need and more, all under one roof. Shop smart. Shop
          fresh. Dive into our diverse range of top-quality items - be it dairy,
          bakery, household essentials, or gourmet foods, we've got you covered.
          And don’t forget our range of organic and sustainable products for
          those who crave an eco-friendly touch. Enjoy a seamless shopping
          experience with easy-to-navigate aisles, special deals, and friendly
          staff ready to assist. Why wait? Discover a world of freshness,
          quality, and convenience at Super Store today!
        </p>
      </div>
    </div>
  );
};

export default Hero;
