import Badge from "$app/elements/Badge"
import Collapse from "$app/elements/Collapse"
import QRCode from "$app/elements/QRCode"
import Timeline from "$app/elements/Timeline"
import { assetReq } from "$app/hooks/services/reactQuery"
import { AssetDetailRes } from "$app/types/response"
import { useEffect, useRef } from "react"
import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"

const Asset = () => {
    const params = useParams()
    const queryClient = useQueryClient()
    const { id } = params
    const { data, isLoading, isRefetching } = assetReq<
        void,
        AssetDetailRes
    >().useShow(id)
    const asset = data?.data
    const ListDiv: any = useRef()

    useEffect(() => {
        setTimeout(() => {
            if (ListDiv && ListDiv.current)
                ListDiv.current.scrollTop = ListDiv.current.scrollHeight
        }, 1000)
    }, [id])

    return (
        <div className="flex flex-col bg-white h-full">
            <Collapse
                titleClassName=""
                title={
                    <h3 className="text-lg leading-6 font-medium text-gray-900/80">
                        General Information
                    </h3>
                }
                loading={isRefetching || isLoading}
                onRefreshClick={() =>
                    queryClient.invalidateQueries(["cases", id])
                }
            >
                <div className="p-8 bg-white">
                    <div className="grid grid-cols-3 place-content-center gap-4">
                        <div>
                            <h3 className="text-[#6B7280] text-sm">
                                Plate No.
                            </h3>
                            <p className="text-ellipsis overflow-hidden ">
                                {asset?.plate_no}
                            </p>
                        </div>
                        <div className="">
                            <h3 className="text-[#6B7280] text-sm">
                                Registration No.
                            </h3>
                            <p className="text-ellipsis overflow-hidden ">
                                {asset?.registration_no}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm">Brand</h3>
                            <p className="text-ellipsis overflow-hidden ">
                                {asset?.brand}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm">Model</h3>
                            <p className="text-ellipsis overflow-hidden ">
                                {asset?.model}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm">
                                Engine Number
                            </h3>
                            <p className="text-ellipsis overflow-hidden">
                                {asset?.engine_number}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm">
                                Chassis Number
                            </h3>
                            <p className="text-ellipsis overflow-hidden">
                                {asset?.chassis_no}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm">
                                Engine Power
                            </h3>
                            <p className="text-ellipsis overflow-hidden">
                                {asset?.engine_power}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm">
                                Body Type
                            </h3>
                            <p className="text-ellipsis overflow-hidden">
                                {asset?.body_type}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[#6B7280] text-sm">
                                Sub Model
                            </h3>
                            <p className="text-ellipsis overflow-hidden">
                                {asset?.submodel}
                            </p>
                        </div>
                    </div>
                    <QRCode src={asset?.qr_image} loading={isLoading} />
                </div>
            </Collapse>

            <Collapse
                titleClassName="bg-white border-b"
                title={
                    <h3 className="flex items-center text-lg leading-6 font-medium text-gray-900/80">
                        ABCD1234 - Acivity
                        <Badge className="ml-2 px-1 py-0.5 uppercase rounded-md">
                            new
                        </Badge>
                    </h3>
                }
                onRefreshClick={() =>
                    queryClient.invalidateQueries(["cases", id])
                }
                loading={isRefetching || isLoading}
            >
                <div
                    className="relative z-20 py-2 max-h-[500px] overflow-y-scroll"
                    ref={ListDiv}
                >
                    {asset?.timelines.map((timeline, indx, self) => (
                        <Timeline
                            key={`timeline-${indx}`}
                            {...timeline}
                            end={self.length - 1 === indx}
                        />
                    ))}
                </div>
            </Collapse>
        </div>
    )
}

export default Asset
