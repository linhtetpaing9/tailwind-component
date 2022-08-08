import Button from "$app/elements/Button"
import { GenieAuthLogo } from "$app/elements/Icons"

export const LoginForm = ({ login }: any) => {
    return (
        <div className="h-screen flex justify-center items-center bg-primary-black">
            <div>
                <div className="rounded-xl max-w-[350px] pb-10">
                    <GenieAuthLogo />
                </div>
                <div className="flex justify-center items-center rounded-xl">
                    <Button onClick={() => login()}>
                        Login with Genie Auth
                    </Button>
                </div>
            </div>
        </div>
    )
}
