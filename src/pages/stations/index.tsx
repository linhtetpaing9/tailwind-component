import { CarroCar } from "$app/elements/Icons"

const Stations = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div>
                <CarroCar className="block ml-auto mr-auto" />
                <p className="mt-2 text-center text-lg opacity-50">
                    You didn’t select any stations yet!
                </p>
            </div>
        </div>
    )
}

export default Stations
