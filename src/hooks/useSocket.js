import { useEffect, useState } from "react"
import { over } from 'stompjs';
import SockJS from "sockjs-client/dist/sockjs"

const endPointWS = import.meta.env.VITE_BACKEND_WEBSOCKET_URL


const formatResponseWS = (body) => {
    const { data, error } = body
    if (error) { return [] }

    // Formato para /channel/punto_atencion/puntoAtencionId data=[] 
    if (Array.isArray(data)) {
        return data
    }
    // Formato para otros canales data={data1:[],data2:0...} 
    if (typeof data !== 'undefined') {
        return data
    }

    return []
}


export const useSocket = (channelSuscribe) => {
    let stompClient = null;
    const [isConnected, setIsConnected] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => { connect() }, [])

    const connect = () => {
        let Sock = new SockJS(endPointWS);
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setIsConnected(true);
        stompClient.subscribe(channelSuscribe, onMessageReceived);

    }
    const onMessageReceived = (payload) => {
        const { body } = JSON.parse(payload.body);
        //Validacion de data
        const dataWs = formatResponseWS(body)
        setData(dataWs)

    }
    const onError = (err) => {
        setIsConnected(false)

    }

    return { isConnected, data }

}