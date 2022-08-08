import Button from "../Button"
import { DownloadIcon } from "../Icons"
import { LoadingIcon } from "../Icons/index"

const QRCode = ({ src, loading }: { src?: string; loading?: boolean }) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border mt-8">
            {loading ? (
                <div className="h-64 flex justify-center">
                    <LoadingIcon className="w-5" />
                </div>
            ) : (
                <img width={265} src={src} />
            )}
            <a href={src} target="_blank" className="w-full" download>
                <Button className="w-full rounded-t-none flex gap-1">
                    <DownloadIcon />
                    Export QR
                </Button>
            </a>
        </div>
    )
}
export default QRCode
