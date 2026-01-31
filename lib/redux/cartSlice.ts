import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                if (existingItem.quantity < existingItem.stock) {
                    existingItem.quantity += 1;
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item && action.payload.quantity > 0 && action.payload.quantity <= item.stock) {
                item.quantity = action.payload.quantity;
            }
            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
