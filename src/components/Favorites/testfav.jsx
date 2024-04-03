import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "../../components/Favorites/FavoriteButton";
import FetchFavoriteProducts from "../FetchProducts/FetchFavoriteProducts";

function FavoritesPage() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    FetchFavoriteProducts(setFavoriteProducts);
  }, []);

  const toggleFavorite = (productId) => {
    // Update the favorite status of the product
    const updatedFavoriteProducts = favoriteProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, isFavorite: !product.isFavorite };
      }
      return product;
    });

    // Update the state with the new list of favorite products
    setFavoriteProducts(updatedFavoriteProducts);

    // Update the favorite products in localStorage or make an API call to update the server
  };

  return (
    <div className="favorites-page">
      <h2>Favorite Products</h2>
      {favoriteProducts.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className="products-list-container">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <div className="product-image">image</div>
                <div className="product-infos">
                  <div className="product-text">
                    <h3>{product.title}</h3>
                  </div>
                </div>
              </Link>
              <div className="button-buy">
                <FavoriteButton
                  isFavorite={product.isFavorite}
                  productId={product.id}
                  toggleFavorite={() => toggleFavorite(product.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;
