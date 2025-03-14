import { Products } from "../components/Products/Products"
import { Customers } from "../components/Customers/Customers"
import { Orders } from "../components/Orders/Orders"

export const AdminPage = () => {
    return (
        <div>
            <Customers />
            <Products />
            <Orders/>
        </div>
    )
}
