import { SuccessIcon } from "~/assets/icons";
import axios from "axios";
import baseUrl from "~/utils/baseUrl";
import { useEffect, useRef, useState } from "react";
function SuccessPayment() {
    const url = new URL(window.location.href);
    const extraData = url.searchParams.get('extraData');
    const orderId = url.searchParams.get('orderId');
    const resultCode = url.searchParams.get('resultCode');
    const element = useRef(false)
    const handleSuccess = async (body) => {
        try {

            const url = `${baseUrl}/api/users/handlePaymentMomoSuccess`;
            const res = await axios.post(url, body);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {

        if (!element.current) {
            element.current = true
            if (resultCode) {

                if (parseInt(resultCode) === 0) {
                    handleSuccess({ extraData, orderId })
                }

            }
        }

    }, [])
    return (<>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ margin: '150px 0px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                    <img src={SuccessIcon} style={{ width: '100px' }} alt="" />
                </div>
                <div style={{ marginTop: '10px', fontSize: '28px', color: '#696969', fontWeight: '500' }}>Success!</div>
                <div style={{ fontSize: '20px' }}>Your request has been processed successfully</div>
                <div style={{ marginTop: '20px', height: '50px', width: '200px', alignSelf: 'center', backgroundColor: '#224057', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                    <a href="/user" style={{ color: 'white', textDecoration: 'none' }}>Continue shopping</a>
                </div>
            </div>
        </div>
    </>);
}

export default SuccessPayment;