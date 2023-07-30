import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Image from 'next/image'
import { Movie, Seats } from '../../../constants/models/Movies'
import styles from './Payment.module.scss'
import MoviesContext from '../../../context/MoviesContext';
import { useGetOrder } from '../../../services/movies'
import axios from 'axios'

const SuccesPayment = () => {

    const router = useRouter();
    const { orderId }: any = router.query;

    const { order, isLoading, isError } = useGetOrder(orderId);

    return (
        <>
            <Head>
                <title>คำสั่งซื้อสำเร็จ</title>
            </Head>
            <div className='d-flex flex-wrap justify-content-evenly'>
            <div className={styles.container}>
                <div className={styles.card}>
                <div className={styles.cardTitleContainer}>
                        <div className={styles.cardTitle}>
                            คำสั่งจองที่นั่งสำเร็จ
                        </div>
                    </div>
                    <div className="alert alert-success" role="alert">
                        ของคุณที่สนใจเข้าร่วมกิจกรรมของเรา <br></br> กรุณาชำระเงิน เพื่อยืนยันคำสั่งจองที่นั่งของคุณ
                    </div>
                    <div className={'image-container-pay'}>
                        <Image src="/S__51208212.jpg" layout="fill" className={'image-pay'} />
                    </div>
                    <div className='d-flex justify-content-center flex-column'>
                        <p className='p-acc'>Account Name: HOUSE OF BLESSING FOUNDATION</p>
                        <p className='p-acc'>Account No.: 2542170358</p>
                        <p className='p-acc'>TMB Thanachart Bank Public Company Limited</p>
                        <p className='p-acc'>Branch: SI WARA TOWN IN TOWN BRANCH</p>
                    </div>
                    {isLoading ?
                        <div>loading...</div>
                        :
                    <Link href={{ pathname: `/plengneepeehainong/paymentNoti`, query: { ordercon: order?.data_order.order_id } }}><button type="button" className="btn btn-danger mt-15">แจ้งการชำระเงิน</button></Link>
}
                    <div className='separator separator-dashed'></div>
                    <div className='text-left'>
                        <h6 >ขั้นตอนการชำระเงิน</h6>
                    </div>

                    <div className='div-steppay'>

                            <div className='div-steppay-flex'>
                                <div className='steppay-num'>
                                    <div className={'image-container-icon'}>
                                        <Image src="/icon-polygon.svg" layout="fill" className={'image-icon'} />
                                    </div>
                                    <p className='steppay-num-span'>1</p>
                                </div>
                                <div className='text-left'>
                                    <p className='steppay-head'>การแจ้งชำระเงินผ่านเว็บไซต์</p>
                                    <p className='steppay-detail'>กดปุ่มสีแดง แจ้งการชำระเงิน จากนั้นกรอก หมายเลขคำสั่งจอง และ แนบสลิปชำระเงิน รอเจ้าหน้าที่ตรวจสอบ</p>
                                    <div className='separator separator-dashed'></div>
                                </div>
                            </div>
                            <div className='div-steppay-flex'>
                                <div className='steppay-num'>
                                    <div className={'image-container-icon'}>
                                        <Image src="/icon-polygon.svg" layout="fill" className={'image-icon'} />
                                    </div>
                                    <p className='steppay-num-span'>2</p>
                                </div>
                                <div className='text-left'>
                                    <p className='steppay-head'>การแจ้งชำระเงินผ่าน Line</p>
                                    <p className='steppay-detail'>เพิ่มเพื่อนผ่านไลน์  <a className='text-success'>@eventpop</a> จากนั้นแจ้ง หมายเลขคำสั่งจอง และ แนบสลิปชำระเงิน รอเจ้าหน้าที่ตรวจสอบ</p>
                                    <div className='separator separator-dashed'></div>
                                </div>
                            </div>
                            <div className='div-steppay-flex'>
                                <div className='steppay-num'>
                                    <div className={'image-container-icon'}>
                                        <Image src="/icon-polygon.svg" layout="fill" className={'image-icon'} />
                                    </div>
                                    <p className='steppay-num-span'>3</p>
                                </div>
                                <div className='text-left'>
                                    <p className='steppay-head'>ตรวจสอบข้อมูลสำเร็จ</p>
                                    <p className='steppay-detail'>เมื่อเจ้าหน้าที่ตรวจสอบแล้ว เราจะทำการส่ง QR Code และข้อมูลการเข้าร่วมงานให้กับทางอีเมลของท่าน ในวันร่วมงานให้นำ QR Code มาเช็คอินเข้างานและร่วมกิจกรรมสนุกๆกับทางเรา</p>
                                    <div className='separator separator-dashed'></div>
                                </div>
                            </div>
                    </div>

                    {isLoading ?
                        <div>loading...</div>
                        :
                        <div>
                            
                            <hr className={styles.hrStyle} />
                            <h6>หมายเลขคำสั่งจอง : {order?.data_order.order_id}</h6>
                            <div className={styles.seatDetailsContainer}>
                                <div className={styles.seatDetails}>
                                    {order?.data_order.my_seasts} Tickets
                                </div>
                                <div className={styles.seatCost}>
                                    Rs.{order?.data_order.price}
                                </div>
                            </div>

                            <div className={styles.seatDetailsContainer}>
                                <div className={styles.seatDetails}>
                                    Total
                                </div>
                                <div className={styles.seatCost}>
                                    Rs.{order?.data_order.price}
                                </div>

                            </div>
                            <hr className={styles.hrStyle} />
                            <h6>รายละเอียดผู้สั่งจอง</h6>
                            <div className='d-flex justify-content-between'>
                                <p className='p-detail'>ชื่อ-นามสกุล </p>
                                <p className='p-detail'>{order?.data_order.username} </p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='p-detail'>อีเมล </p>
                                <p className='p-detail'>{order?.data_order.email} </p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='p-detail'>เบอร์ติดต่อ </p>
                                <p className='p-detail'>{order?.data_order.phone} </p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='p-detail'>Line ID </p>
                                <p className='p-detail'>{order?.data_order.line} </p>
                            </div>
                            <div className='separator separator-dashed'></div>
                            <div className='text'>
                            <h6>Customer Support</h6>
                                <p className='p-detail2'>ทุกวันจันทร์-อาทิตย์ 10:00 – 18:00 น.</p>
                                <p className='p-detail2'>Live Chat : Youtube.com/Emmy</p>
                                <p className='p-detail2'>E-mail : pop@eventpop.me</p>
                                <p className='p-detail2'>Line@ : @eventpop</p>
                                <p className='h-detail2'>ทุกวันจันทร์-ศุกร์ 10:00 - 18:00 น. <br></br> (ยกเว้นวันเสาร์-อาทิตย์และวันหยุดนักขัตฤกษ์)</p>
                                <p className='p-detail2'>Call Center : 062-5932224</p>
                            </div>
                        </div>
                    }

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

export default SuccesPayment;