import React, { useEffect, useRef } from 'react'
import { Typography } from 'antd';
import { useReactToPrint } from "react-to-print";
import logo from '../../assets/img/logo-delpz.png'

const { Title } = Typography;

const Ticket = ({ ticket, tipoTicketSelected, agencia }) => {
    const componentRef = useRef();

    useEffect(() => {
        if (ticket) {
            handlePrint();
        }
    }, [ticket])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: '',
        pageStyle:"@page { size: 4in 3.5in}",
    });

    return (
        <>
            <div ref={componentRef} style={{textAlign: 'center'}}>
                <figure style={{margin:0,padding:0}}> 
                    <img src={logo} alt="logo-delapaz" width={100}/>
                </figure>
                <Title style={{margin:0,padding:0,fontSize:70,fontWeight:'bold'}}>{ticket.numeroTicket}</Title>
                <Title style={{margin:0,padding:0}} italic level={3}>{tipoTicketSelected?.descripcion}</Title>
                <Title style={{margin:0,padding:0}} italic level={5}>Agencia: {agencia.descripcion}</Title>
                <Title style={{margin:0,padding:0}} italic level={5}>Fecha: {ticket.fechaRegistroTicket}</Title>
                <Title style={{margin:0,padding:0}} italic level={5}>Por favor tome su ticket y esté atento a su llamado. Gracias. </Title>
            </div>
        </>
    )
}

export default Ticket