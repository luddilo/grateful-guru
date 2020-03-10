import moment from "moment"

export const getDateString = (ms: number) => {
    const _moment = moment(ms)
    const nowMoment = moment()
    return _moment.format("Do of MMMM" + (_moment.year() !== nowMoment.year() ? " Y" : ""))
}