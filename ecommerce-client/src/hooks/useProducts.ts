import { useState } from "react";
import { ProductCreate, ProductUpdate } from "../types/Product";
import {
  createProduct,
  deleteProduct,
  fetchProductById,
  fetchProducts,
  updateProduct,
} from "../services/productService";

export const useProduct = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProductsHandler = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProducts();
      return data;
    } catch (error) {
      setError("Error fetching products");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProductByIdHandler = async (id: number) => {
    setIsLoading(true);
    try {
      const data = await fetchProductById(id);
      return data;
    } catch (error) {
      setError("Error fetching product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProductHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
    } catch (error) {
      setError("Error: Could not delete product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductHandler = async (id: number, payload: ProductUpdate) => {
    setIsLoading(true);
    try {
      const data = await updateProduct(id, payload);
      return data;
    } catch (error) {
      setError("Error: Could not update product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };


  const createProductHandler = async (payload: ProductCreate) => {
    setIsLoading(true);
    try {
      const data = await createProduct(payload);
      return data;
    } catch (error) {
      setError("Error: Could not create product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    fetchProductsHandler,
    deleteProductHandler,
    updateProductHandler,
    fetchProductByIdHandler,
    createProductHandler,
  };
};
