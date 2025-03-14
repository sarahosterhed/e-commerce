import { Order } from './../types/Order';

export type Action = {
    type: ActionType,
    payload: string;
}

export enum ActionType {
    LOADED,
    UPDATED,
    DELETED,
}

export const OrderReducer = ( orders: Order[], action: Action) : Order[] => {
    if (action.type === ActionType.LOADED) {
        return JSON.parse(action.payload).reverse();
    }
    if (action.type === ActionType.UPDATED){
        const updatedOrder = JSON.parse(action.payload)
        return orders.map((Order) => Order.id === updatedOrder.id ? updatedOrder : Order)
    }
    if (action.type === ActionType.DELETED) {
        return orders.filter((Order) => Order.id !== JSON.parse(action.payload))
    }

    return orders;
}