import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from  'react-hot-toast';

import axiosInstance from "../../Helpers/axiosInstance";



const initialState = {
   isLoggedIn: localStorage.getItem('isLoggedIn') || false,
   role: localStorage.getItem('role') || "",
   data: localStorage.getItem('data') !== undefined ? JSON.parse(localStorage.getItem('data')) : {} 
};

export const createAccount = createAsyncThunk("/auth/signup", async (data, thunkAPI) => {
  try {
    // 🔥 wrap the axios call *inside* toast.promise
    const response = await toast.promise(
      axiosInstance.post("user/register", data),
      {
        loading: "wait! Creating your account...",
        success: (res) => res?.data?.message || "Account created successfully!",
        error: (err) => err?.response?.data?.message || "Signup failed",
      }
    );

    return response.data; // This becomes response.payload
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});


export const login = createAsyncThunk("/auth/login", async (data, thunkAPI) => {
  try {
    // 🔥 wrap the axios call *inside* toast.promise
    const response = await toast.promise(
      axiosInstance.post("user/login", data),
      {
        loading: "wait! authentication in progress...",
        success: (res) => res?.data?.message || "successfully logged in",
        error: (err) => err?.response?.data?.message || "failed to login",
      }
    );

    return response.data; // This becomes response.payload
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    const res = await toast.promise(
      axiosInstance.post("user/logout"),
      {
        loading: "Logging out...",
        success: (res) => res?.data?.message || "Logged out successfully",
        error: (err) => err?.response?.data?.message || "Logout failed"
      }
    );
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

// export const updateProfile = createAsyncThunk("/user/update/profile", async(data) => {
//   try {
//     const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
//     toast.promise(res, {
//     loading: "wait profile update in progress...",
//     success: (data) => {
//       return data?.data?.message;
//     },
//     error: "Failed to update profile"
//   });
//   return (await res).data;
//   } catch(error) {
//      toast.error(error?.response?.data?.message);
//   }
// })
export const updateProfile = createAsyncThunk("/user/update/profile", async ({ id, formData }, thunkAPI) => {
  try {
    const res = await toast.promise(
      axiosInstance.put(`user/update/${id}`, formData),
      {
        loading: "wait profile update in progress...",
        success: (res) => res?.data?.message || "profile updated successfully",
        error: (err) => err?.response?.data?.message || "Failed to update the profile"
      }
    );
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const getUserData = createAsyncThunk("user/details", async () => {
  try {
     const res = axiosInstance.get("user/me");
     return (await res).data;
  } catch(error) {
     toast.error(error.message);
  }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
          localStorage.clear();
          state.isLoggedIn = false;
          state.data = {};
          state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
          if(!action?.payload?.user) return;
          localStorage.setItem("data",JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role",action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role
        });
    }
});

export const {} = authSlice.actions;
export default authSlice.reducer;