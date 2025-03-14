import { useEffect, useReducer, useState } from "react";
import { ProductContext } from "../../contexts/productContext";
import { useProduct } from "../../hooks/useProducts";
import { ActionType } from "../../reducers/CustomerReducer";
import { ProductReducer } from "../../reducers/ProductReducer";
import { CreateProduct } from "./CreateProduct";
import { UpdateProduct } from "./UpdateProduct";

export const Products = () => {
  const { fetchProductsHandler, deleteProductHandler } = useProduct();
  const [products, dispatch] = useReducer(ProductReducer, []);
  const [updateProductId, setUpdateProductId] = useState<number | null>(null);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const handleOpen = () => setOpenCreate(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchProductsHandler();
      dispatch({
        type: ActionType.LOADED,
        payload: JSON.stringify(data),
      });
    };
    getData();
  }, []);

  const handleUpdate = (id: number) => {
    setUpdateProductId(id);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteProductHandler(id);
    dispatch({
      type: ActionType.DELETED,
      payload: JSON.stringify(id),
    });
  };

  const handleCreate = () => {
    handleOpen();
  };

  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      <div>
        {openCreate ? (
          <CreateProduct handleClose={() => setOpenCreate(false)} />
        ) : (
          <button onClick={handleCreate}>Create new product</button>
        )}
        <h2>Manage Products</h2>
        <section id="product-list">
          {products.map((p) => (
            <article
              key={p.id}
              className="list-group-item"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
              }}
            >
              {updateProductId === p.id ? (

                <UpdateProduct
                  productId={p.id}
                  setUpdateProductId={setUpdateProductId}
                />
              ) : (
                <section
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <p>Name: {p.name}</p>
                  <p>Description: {p.description}</p>
                  <p>Price: {p.price} SEK</p>
                  <p>Stock: {p.stock}</p>
                  <p>Category: {p.category}</p>
                  <p>Created At: {p.created_at}</p>
                  <div
                    style={{ marginTop: "10px", display: "flex", gap: "10px" }}
                  >
                    <button onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleUpdate(p.id)}>
                      Edit
                    </button>
                  </div>
                </section>
              )}
            </article>
          ))}
        </section>
      </div>
    </ProductContext.Provider>
  );
};
