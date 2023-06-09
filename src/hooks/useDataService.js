import { useEffect, useState } from "react";

const responseFrontDefault = {
    data: [],
    message: '',
    error: false,
    status: null
}

export const useGetDataService = (serviceMethod) => {

    const [responseFront, setResponseFront] = useState(responseFrontDefault);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleData()
    }, []);

    const handleData = async () => {
        setLoading(true)
        const dataFetch = await serviceMethod();

        setResponseFront({
            data: dataFetch.data,
            message: dataFetch.message,
            error: dataFetch.error,
            status:dataFetch.status
        })
        setLoading(false)
    }
    return { ...responseFront, loading, handleData };

}

export const useGetDataServiceByParam = (serviceMethod, param) => {
    //console.log("IDAgencia",param)
    const [responseFront, setResponseFront] = useState(responseFrontDefault);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        handleData()
    }, []);

    const handleData = async () => {
        setLoading(true)
        const dataFetch = await serviceMethod(param);
        setResponseFront({
            data: dataFetch.data,
            message: dataFetch.message,
            error: dataFetch.error,
            status:dataFetch.status
        })
        setLoading(false)
    }

    return { ...responseFront, loading, handleData };

}
