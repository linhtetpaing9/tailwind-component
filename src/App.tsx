import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastProvider } from "./contexts/ToastContext"

import WorkShopsParent from "./pages/workshops/parent"
import WorkShops from "./pages/workshops"
import WorkShop from "./pages/workshops/show"

import StationsParent from "./pages/stations/parent"
import Stations from "./pages/stations"
import Station from "./pages/stations/show"
import StationEdit from "./pages/stations/edit"

import AssetParent from "./pages/assets/parent"
import Assets from "./pages/assets"
import Asset from "./pages/assets/show"

import UserParent from "./pages/users/parent"
import Users from "./pages/users"
import User from "./pages/users/show"

import Home from "./pages/home"
import Toast from "./elements/Notification"
import useToast from "./hooks/actions/useToast"
import { LoginForm } from "$components/Auth/LoginForm"
import { useAuth } from "./hooks/services/useAuth"
import { AuthContext } from "./contexts/AuthContext"
import { QueryClient, QueryClientProvider } from "react-query"
import Loading from "./elements/Loading"
import { XCircleIcon } from "@heroicons/react/outline"

function App() {
    const { toast, toastProps } = useToast()
    const {
        authenticated,
        login,
        logout,
        loading,
        setBearerToken,
        removeToken,
    } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!authenticated && !loading) {
        return <LoginForm login={login} />
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                refetchOnWindowFocus: false,
                onError(err: any) {
                    if (err != null) {
                        if (err?.status === 401) {
                            toast({
                                duration: 5000,
                                title: "Unauthenticated",
                                description:
                                    "Your token is expired or invalid.",
                                icon: (
                                    <XCircleIcon
                                        className="h-6 w-6 text-red-400"
                                        aria-hidden="true"
                                    />
                                ),
                            })
                            setTimeout(() => {
                                removeToken()
                            }, 5000)
                        }
                        if (err?.status === 500) {
                            toast({
                                duration: 5000,
                                title: "500 Server Error",
                                description: "Oops, something went wrong.",
                                icon: (
                                    <XCircleIcon
                                        className="h-6 w-6 text-red-400"
                                        aria-hidden="true"
                                    />
                                ),
                            })
                        }
                        if (err?.status === 422) {
                            toast({
                                duration: 5000,
                                title: "422 Server Error",
                                description: "Oops, some data are not valid.",
                                icon: (
                                    <XCircleIcon
                                        className="h-6 w-6 text-red-400"
                                        aria-hidden="true"
                                    />
                                ),
                            })
                        }
                    } else {
                        removeToken()
                    }
                },
            },
        },
    })
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider toast={toast} toastProps={toastProps}>
                <AuthContext.Provider
                    value={{
                        authenticated,
                        login,
                        logout,
                        loading,
                        setBearerToken,
                    }}
                >
                    <BrowserRouter>
                        <Toast {...toastProps} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<AssetParent />}>
                                <Route index element={<Assets />} />
                                <Route path=":id" element={<Asset />} />
                            </Route>

                            <Route
                                path="workshops"
                                element={<WorkShopsParent />}
                            >
                                <Route index element={<WorkShops />} />
                                <Route path=":id" element={<WorkShop />} />
                            </Route>

                            <Route path="stations" element={<StationsParent />}>
                                <Route index element={<Stations />} />
                                <Route path=":id" element={<Station />} />
                                <Route
                                    path=":id/edit"
                                    element={<StationEdit />}
                                />
                            </Route>

                            <Route path="users" element={<UserParent />}>
                                <Route index element={<Users />} />
                                <Route path=":id" element={<User />} />
                            </Route>

                            <Route
                                path="*"
                                element={
                                    <main className="flex justify-center items-center h-screen">
                                        <p>The page does not exist!</p>
                                    </main>
                                }
                            />
                        </Routes>
                    </BrowserRouter>
                </AuthContext.Provider>
            </ToastProvider>
        </QueryClientProvider>
    )
}

export default App
