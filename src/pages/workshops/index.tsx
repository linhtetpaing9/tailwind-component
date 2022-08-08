import { CarroCar } from "$app/elements/Icons"

const WorkShops = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div>
                <CarroCar className="block ml-auto mr-auto" />
                <p className="mt-2 text-center text-lg opacity-50">
                    You didn’t select any workshops yet!
                </p>
            </div>
        </div>
    )
}

export default WorkShops
