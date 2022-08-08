import { AuthContext } from "$app/contexts/AuthContext"
import { CarroCar } from "$app/elements/Icons"
import MultiColumnsLayout from "$components/Layouts/MultiColumnsLayout"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate()
    const { setBearerToken } = useContext(AuthContext)
    useEffect(() => {
        setBearerToken()
        navigate("/products", {
            replace: true,
        })
    }, [])
    return (
        <MultiColumnsLayout>
            <div className="h-screen flex items-center justify-center">
                <div>
                    <CarroCar className="block ml-auto mr-auto" />
                    <p className="mt-2 text-center text-lg opacity-50">
                        Working in progress
                    </p>
                </div>
            </div>
        </MultiColumnsLayout>
    )
}

export default Home
