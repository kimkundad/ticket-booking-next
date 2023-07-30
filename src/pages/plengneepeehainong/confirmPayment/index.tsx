import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';


import styles from './Payment.module.scss'
import axios from 'axios'

const ConfirmPayment = () => {

    const router = useRouter();
    const { movieId, seatDetails, usetotal, seats }: any = router.query;

    const [isTimerCompleted, setIsTimerCompleted] = useState(false);
    const [checkError, setcheckError] = useState<Boolean>(false);
    const [checkErrorRe, setcheckErrorRer] = useState<Boolean>(false);
    const [errorMsg, setErrorMsg] = useState<String>('');

    const [email, setEmail] = useState<String>('');
    const [userName, setUserName] = useState<String>('');
    const [phone, setPhone] = useState<String>('');
    const [line, setLine] = useState<String>('');

    const onChangeEmail = (e: any) => {
        setEmail(e.target.value);
    };

    const onChangeUserName = (e: any) => {
        setUserName(e.target.value);
    };

    const onChangePhone = (e: any) => {
        setPhone(e.target.value);
    };

    const onChangeLine = (e: any) => {
        setLine(e.target.value);
    };

    const onConfirmButtonClick = async (e: any) => {
        e.preventDefault();

        setIsTimerCompleted(true)

        if (email === '') {
            setcheckError(true)
            setErrorMsg('กรุณากรอกอีเมลของท่านด้วย')
            setIsTimerCompleted(false)
            return
        }

        if (userName === '') {
            setcheckError(true)
            setErrorMsg('กรุณากรอก ชื่อ-นามสกุล ของท่านด้วย')
            setIsTimerCompleted(false)
            return
        }

        if (phone === '') {
            setcheckError(true)
            setErrorMsg('กรุณากรอก เบอร์ติดต่อ ของท่านด้วย')
            setIsTimerCompleted(false)
            return
        }

        setcheckError(false)
        const user = {
            email,
            userName,
            phone,
            line,
            movieId,
            seatDetails,
            usetotal
        }


        axios.post(`${process.env.API}/addOrder`, { user }).then(
            response => {

                if (response.status === 200) {

                    router.push('/plengneepeehainong/succesPayment?orderId=' + response.data.order_id);

                } else {
                    setcheckErrorRer(true)
                    setcheckError(true)
                    setErrorMsg(response.data.data)
                    setIsTimerCompleted(false)
                    return
                }

            })

        console.log('user-->', user)


    }

    return (
        <>
            <Head>
                <title>Payment Page</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.cardTitleContainer}>
                        <div className={styles.cardTitle}>
                            ข้อมูลของผู้สั่งจองที่นั่ง
                        </div>
                    </div>
                    <hr className={styles.hrStyle} />
                    <div className={styles.seatDetailsContainer}>
                        <div className={styles.seatDetails}>
                            {seatDetails} Tickets
                        </div>
                        <div className={styles.seatCost}>
                            Rs.{usetotal}
                        </div>
                    </div>

                    <div className={styles.seatDetailsContainer}>
                        <div className={styles.seatDetails}>
                            Total
                        </div>
                        <div className={styles.seatCost}>
                            Rs.{usetotal}
                        </div>

                    </div>
                    <hr className={styles.hrStyle} />

                    {checkError === true &&
                        <div className="alert alert-warning" role="alert">
                            {errorMsg}
                        </div>
                    }


                    <div className="mb-3 text-left">
                        <label className="form-label">Email address <span className='text-danger'>*</span></label>
                        <input type="email" name="email" className="form-control" onChange={onChangeEmail} />
                        <div className="form-text">ระบบจะส่งข้อมูลการชำระเงินให้ทาง email</div>
                    </div>
                    <div className="mb-3 text-left">
                        <label className="form-label">ชื่อ - นามสกุล <span className='text-danger'>*</span></label>
                        <input type="text" name="username" className="form-control" onChange={onChangeUserName} />
                    </div>
                    <div className="mb-3 text-left">
                        <label className="form-label">เบอร์ติดต่อ <span className='text-danger'>*</span></label>
                        <input type="text" name="phone" className="form-control" onChange={onChangePhone} />
                    </div>
                    <div className="mb-3 text-left">
                        <label className="form-label">Line ID</label>
                        <input type="text" name="line" className="form-control" onChange={onChangeLine} />
                    </div>
                    <div className={styles.paymentButtonContainer}>
                        {checkErrorRe === false ?
                            <Button variant="contained" disabled={isTimerCompleted} className={styles.paymentButton} onClick={onConfirmButtonClick}>
                                ยืนยันรายการสั่งจอง
                            </Button>
                            :
                            <Link href={{ pathname: `/plengneepeehainong/seats/${movieId}`, query: { seats: isTimerCompleted ? null : JSON.stringify(seats) } }}><button type="button" className="btn btn-secondary">กลับไปเลือกที่นั่งใหม่</button></Link>
                        }

                    </div>

                </div>
            </div>
        </>
    );

}

type MovieType = {
    isLoading: boolean;
    isError: boolean;
}

export default ConfirmPayment;