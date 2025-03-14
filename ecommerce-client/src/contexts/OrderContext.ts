import { Order } from './../types/Order';
import { createContext, Dispatch } from 'react';
import { Action } from '../reducers/CustomerReducer';

export type OrderContextType = {
    orders: Order[],
    dispatch: Dispatch<Action>
}

export const OrderContext = createContext<OrderContextType>({
    orders: [],
    dispatch: () => {}
})