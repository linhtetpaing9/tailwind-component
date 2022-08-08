import { genieDateFormat } from "$app/hooks/helpers/numbers"
import Badge from "../Badge"
import Divider from "../Divider"
import { TimelineProps } from "./type"

const Timeline = ({
    avatar,
    created_at,
    station_name,
    station_type,
    total_time,
    user_name,
    end = false,
}: TimelineProps) => {
    const date = new Date(created_at || "")
    const createAt = genieDateFormat(date)

    return (
        <div className="relative grid grid-cols-8 items-center justify-center">
            <div className="bg-white z-20 p-1 -m-t-10">
                <img
                    className="block ml-auto mr-auto w-1/2 rounded-full"
                    src={avatar || "/images/dump-person.png"}
                />
            </div>
            <div className="col-start-2 col-end-6">
                <p className="text-[16px] text-black font-semibold">
                    {station_name}
                    {end && (
                        <Badge className="ml-2 px-1 py-0.5 uppercase rounded-md">
                            new
                        </Badge>
                    )}
                </p>
                <p className="text-[13px] text-black">
                    <span className="text-[#368EAB] font-semibold">
                        {station_type}{" "}
                    </span>
                    • {user_name}
                </p>
            </div>

            <span className="col-start-6 col-end-9 text-black/50 text-[13px]">
                {createAt}
            </span>
            <Divider className="col-start-2 col-end-9 my-2" />

            {!end && (
                <>
                    <Divider className="col-start-1" type="vertical" />
                    <div className="col-start-1 col-end-6 ml-4 bg-white z-20 p-1">
                        <Badge
                            type="secondary"
                            className="text-[#666B74] rounded-xl px-2 py-0.5"
                        >
                            Total Time:
                            <span className="ml-1 font-semibold text-black">
                                {total_time}
                            </span>
                        </Badge>
                    </div>
                    <div className="col-start-1 min-h-10 invisible">space</div>
                </>
            )}
        </div>
    )
}

export default Timeline
