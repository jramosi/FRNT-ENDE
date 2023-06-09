import axios from "axios";
import ENDPOINT from "../constants/EndPoints";
import { FORMAT_DATA } from "../constants/Response";
import { formatRequestError, formatResponseSuccess } from "../util/apiResponseRequest";
import { endPointReplaceId } from "../util/helpers";

export const getAllMultimedia = async () => {
    try {
        const response = await axios.get(ENDPOINT.MULTIMEDIA_ALL);
        return formatResponseSuccess(response, FORMAT_DATA.TYPE_ARRAY)
    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}

export const getMultimediaById = async (id) => {
    try {
        const response = await axios.get(endPointReplaceId(ENDPOINT.MULTIMEDIA_BY_ID, id));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const createMultimedia = async (data) => {
    try {
        const response = await axios.post(ENDPOINT.MULTIMEDIA_CREATE, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const updateMultimedia = async (data) => {
    try {
        const response = await axios.put(ENDPOINT.MULTIMEDIA_UPDATE, data);
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    }
}

export const deleteMultimedia = async (id) => {
    try {
        const response = await axios.post(endPointReplaceId(ENDPOINT.MULTIMEDIA_DELETE, id));
        return formatResponseSuccess(response)
    } catch (error) {
        return formatRequestError(error)
    };
}

export const getAllUrlsMultimedia = async () => {
    try {
        const response = await axios.get(ENDPOINT.MULTIMEDIA_ALL);
        const { data = [], error = false, message = '' } = response.data
        let urls = []
        if (!error) {
            data.map(a => {
                if (a.play) {
                    urls.push(a.url)
                }
            });
        }
        return { error, message, data: urls };

    } catch (error) {
        return formatRequestError(error, FORMAT_DATA.TYPE_ARRAY)
    }
}