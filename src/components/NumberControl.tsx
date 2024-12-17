import { Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

type Product = {
    id: string;
    quantity: number;
};
const NumberControl: React.FC<Product> = ({ id, quantity }) => {
    const { dispatch } = useCart();
    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    const newQuantity = quantity - 1;
                    newQuantity === 0
                        ? dispatch({ type: "REMOVE_ITEM", payload: id })
                        : dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: {
                                  productId: id,
                                  quantity: Math.max(0, quantity - 1),
                              },
                          });
                }}
                className="p-[10px] hover:bg-blue-500 rounded-md bg-blue-600 text-white"
                aria-label="Decrease quantity"
            >
                <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                        type: "UPDATE_QUANTITY",
                        payload: {
                            productId: id,
                            quantity: quantity + 1,
                        },
                    });
                }}
                className="p-[10px] hover:bg-blue-500 rounded-md  bg-blue-600 text-white"
                aria-label="Increase quantity"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
};

export default NumberControl;
