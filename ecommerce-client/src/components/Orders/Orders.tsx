import { ChangeEvent, FormEvent, useEffect, useReducer, useState } from "react";
import { fetchOrderById } from "../../services/orderService";
import { Order } from "../../types/Order";
import { useOrders } from "../../hooks/useOrders";
import { OrderContext } from "../../contexts/OrderContext";
import { ActionType, OrderReducer } from "../../reducers/OrderReducer";

export const Orders = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orders, dispatch] = useReducer(OrderReducer, []);
  const { deleteOrderHandler, updateOrderHandler, fetchOrdersHandler } = useOrders();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchOrdersHandler();
      console.log(data);
      dispatch({
        type: ActionType.LOADED,
        payload: JSON.stringify(data),
      });
    };
    getData();
  }, []);

  useEffect(() => {
    if (!selectedOrderId) return;
    const getData = async () => {
      const data = await fetchOrderById(selectedOrderId);
      setOrder(data);
    };
    getData();
  }, [selectedOrderId]);

  const handleUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLSelectElement;

    setOrder((prevOrder) => {
      if (!prevOrder) return null;
      return { ...prevOrder, [name]: value };
    });
  };

  const handleDelete = async (id: number) => {
    if (!id) return;
    await deleteOrderHandler(id);
    dispatch({
      type: ActionType.DELETED,
      payload: JSON.stringify(id),
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedOrderId !== null && order !== null) {
      await updateOrderHandler(selectedOrderId, order);
      const updatedOrders = await fetchOrdersHandler();
      dispatch({
        type: ActionType.LOADED,
        payload: JSON.stringify(updatedOrders),
      });
    }
    setSelectedOrderId(null);
  };

  return (
    <OrderContext.Provider value={{ orders, dispatch }}>
      <div>
        {orders.map((order) => (
          <div key={order.id}>
            <p>{order.id}</p>
            <p>{order.created_at}</p>
            <p>{order.total_price}</p>
            <p>{order.payment_id}</p>

            {selectedOrderId === order.id ? (
              <form onSubmit={handleSubmit}>
                <label>
                  Payment Status:
                  <select name="payment_status" onChange={handleUpdate} defaultValue={order.payment_status}>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </label>

                <label>
                  Update order status:
                  <select name="order_status" onChange={handleUpdate} defaultValue={order.order_status}>
                    <option value="placed">Placed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="outForDelivery">Out for delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </label>

                <button type="submit">Update</button>
                <button type="button" onClick={() => setSelectedOrderId(null)}> Cancel</button>
              </form>
            ) : (
              <div>
                <p>Payment Status: {order.payment_status}</p>
                <p>Order Status: {order.order_status}</p>
                <button onClick={() => setSelectedOrderId(order.id)}> Edit </button>
              </div>
            )}
            <button onClick={() => order.id !== null && handleDelete(order.id)}>Delete</button>
          </div>
        ))}
      </div>
    </OrderContext.Provider>
  );
};
