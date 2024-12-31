import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import APIClientPrivate from '../utils/axios';

// Fetch Cart Items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await APIClientPrivate.get(`/api/cart/get/${userId}`);
      return response.data.cart.products || [];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add to Cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await APIClientPrivate.post('/api/cart/add', {
        userId,
        productId,
        quantity,
      });
      return response.data.cart.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Increment Quantity
export const incrementCartItem = createAsyncThunk(
  'cart/incrementCartItem',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      console.log(userId)
      console.log(productId)
      await APIClientPrivate.put(`/api/cart/increment/${userId}`, { productId });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Decrement Quantity
export const decrementCartItem = createAsyncThunk(
  'cart/decrementCartItem',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await APIClientPrivate.put(`/api/cart/decrement/${userId}`, { productId });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      await APIClientPrivate.delete(`/api/cart/remove/${userId}`, {
        data: { productId },  // Pass productId through data
      });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.productId._id === action.payload);
        if (item) item.quantity += 1;
      })
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        const item = state.items.find((item) => item.productId._id === action.payload);
        if (item && item.quantity > 1) item.quantity -= 1;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId._id !== action.payload);
      });
  },
});

export default cartSlice.reducer;
