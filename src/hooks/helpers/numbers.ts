export const generateRandomString = (length: number): string => {
    let result = ""
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return result
}

function minTwoDigits(n: number) {
    return (n < 10 ? "0" : "") + n
}

export function genieDateFormat(date: Date) {
    var strArray = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    var d = date.getDate()
    var m = strArray[date.getMonth()]
    var y = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ? hours : 12

    return `${m} ${d}, ${y} ${minTwoDigits(hours)}:${minTwoDigits(
        minutes
    )} ${ampm}`
}

export function range(start: number, end: number) {
    const length = end - start + 1
    return Array.from({ length }, (_, index) => index + start)
}
