/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyle from "./styles/GlobalStyle";
import AppLayout from "./ui/AppLayout";
import { QueryClient ,QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckedIn from "./pages/checkedIn";
import ProtectedRoute from "./ui/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
const queryClient = new QueryClient({defaultOptions: {
  queries: {
    staleTime: 0,},
  },})

function App() {
  return (
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    <GlobalStyle/>
    <BrowserRouter>
    <Routes>
    
     <Route element=
     {<ProtectedRoute>
      <AppLayout />
     </ProtectedRoute>}>
     
  <Route index element={<Navigate replace to="dashboard" />} />
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="bookings" element={<Bookings />} />
  <Route path="bookings/:bookingId" element={<Booking />} />
  <Route path="checkedIn/:bookingId" element={<CheckedIn/>} />
  <Route path="accounts" element={<Account />} />
  <Route path="cabins" element={<Cabins />} />
  <Route path="setting" element={<Settings />} />
  <Route path="users" element={<Users />} />
</Route>
      <Route path="login" element={<Login/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    
    style: {
      background: '#1f2937', 
      color: '#fff',
      fontSize: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
    },

    success: {
      iconTheme: {
        primary: '#22c55e', 
        secondary: '#fff',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444', 
        secondary: '#fff',
      },
    },
  }}
/>
    </QueryClientProvider>
  </ThemeProvider>
  )
}

export default App;
