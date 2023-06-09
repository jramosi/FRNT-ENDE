import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";

export const getDispensadorByMac = async (mac) => {
    try {
        const response = await axios.get(ENDPOINT.DISPENSADOR_BY_MAC + mac);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}