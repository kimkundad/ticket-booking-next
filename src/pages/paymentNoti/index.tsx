import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Image from 'next/image'
import { Movie, Seats } from '../../constants/models/Movies'
import styles from './Payment.module.scss'
import MoviesContext from '../../context/MoviesContext';
import { useGetOrder } from '../../services/movies'
import axios from 'axios'

const PaymentNoti = () => {

    const router = useRouter();
    const { ordercon }: any = router.query;

    const { order, isLoading, isError } = useGetOrder(ordercon);
    const [checkErrorRe, setcheckErrorRer] = useState(false);
    const [orderNo, setOrderNo] = useState('');
    const [image, setImage] = useState(null);
    const [isTimerCompleted, setIsTimerCompleted] = useState(false);
    const [errorMsg, setErrorMsg] = useState<String>('');
    const [checkError, setcheckError] = useState(false);
    const [checkSuccess, setCheckSuccess] = useState(false);
    console.log('order-->',order?.data_order?.order_id)

    const [createObjectURL, setCreateObjectURL] = useState<String>('');

    useEffect(() => {
        if(order?.data_order?.order_id !== undefined) {
        setOrderNo(order?.data_order?.order_id)
        }
      });

    const onChangeOrder = (e: any) => {
        setOrderNo(e.target.value);
    };

    const uploadToClient = (event:any) => {
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
          console.log('setImage-->',i)
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
        }
      };

    const onConfirmButtonClick = async (e: any) => {
        e.preventDefault();

        if (orderNo === '') {
            setcheckError(true)
            setIsTimerCompleted(false)
            setErrorMsg('กรุณากรอกหมายเลขคำสั่งจองของท่านด้วย')
            return
        }

        if (image === null) {
            setcheckError(true)
            setIsTimerCompleted(false)
            setErrorMsg('กรุณาใส่สลิปการโอนเงินของท่านด้วย')
            return
        }

        const body = new FormData();
        body.append("file", image);
        body.append("orderNo", orderNo);

      

        axios.post(`${process.env.API}/addPayment`, body).then(
            response => {

                if (response.status === 200) {

                    setCheckSuccess(true)
                    setcheckErrorRer(false)
                    setcheckError(false)
                    setIsTimerCompleted(true)

                } else {
                    setcheckErrorRer(true)
                    setcheckError(true)
                    setErrorMsg(response.data.data)
                    setIsTimerCompleted(false)
                    setCheckSuccess(false)
                    return
                }

            })

        
    }

    return (
        <>
            <Head>
                <title>แจ้งการชำระเงิน</title>
            </Head>
            <div className='d-flex flex-wrap justify-content-evenly'>
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.cardTitleContainer}>
                            <div className={styles.cardTitle}>
                                แจ้งการชำระเงิน
                            </div>
                        </div>
                        <hr className={styles.hrStyle} />

                        {checkError === true &&
                        <div className="alert alert-warning" role="alert">
                            {errorMsg}
                        </div>
                    }

                    {checkSuccess === true &&
                        <div className="alert alert-success" role="alert">
                        ขอบคุณค่ะ เราได้รับข้อมูลของคุณแล้ว! รอการติดต่อกลับ
                    </div>
                    }

                        <div className="mb-3 text-left">
                            <label className="form-label"> หมายเลขคำสั่งจอง <span className='text-danger'>*</span></label>
                            <input type="text" name="username" className="form-control" onChange={onChangeOrder} value={order?.data_order?.order_id} />
                        </div>
                        <div className="mb-3 text-left">
                            <label className="form-label">สลิปการโอนเงิน <span className='text-danger'>*</span></label>
                            <input className="form-control" name="myImage" type="file" onChange={uploadToClient}/>
                        </div>
                        <div className={styles.paymentButtonContainer}>
                    
                            <Button variant="contained" disabled={isTimerCompleted} className={styles.paymentButton} onClick={onConfirmButtonClick}>
                                ส่งข้อมูล
                            </Button>
                        

                    </div>
                    </div>
                </div>
            </div>

        </>
    );

}

type MovieType = {
    movie: Movie;
    isLoading: boolean;
    isError: boolean;
}

export default PaymentNoti;