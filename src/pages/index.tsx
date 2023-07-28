import { Grid, Button } from '@mui/material';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useGetEvent } from '../services/movies'
import { Movie } from '../constants/models/Movies';
import { AiOutlineCalendar, AiOutlinePushpin, AiOutlineTeam, AiOutlineDollarCircle, AiOutlineAppstoreAdd } from "react-icons/ai";

export default function Home() {


  const { event, isLoading, isError } = useGetEvent();

  const myLoader=()=>{
    return `${process.env.imageAPI}/mawastudio/img/${event?.data?.image}`;
  }

  return (
    <>
      <Head>
        <title>Book My Ticket | Home</title>
      </Head>
      <div className={styles.event_cover_box}>
        <div className={styles.poster_cover_box}>
          <div className={styles.bg_blur_cover}></div>
        </div>
        <div className={styles.theme_hero_area_body}>
          <div className='container'>
            <div className='theme-page-section'>

              {isLoading ?
                <div>loading...</div>
                :
                <div className="d-flex justify-content-center flex-wrap">
                <div className={'image-container'}>
                  <Image loader={myLoader} src={`${process.env.imageAPI}/mawastudio/img/${event?.data?.image}`} layout="fill" className={'image'} />
                </div>
                <div className='event-info-desktop '>
                  <div className='top-bot'>
                    <p>งานการกุศลมูลนิธิบ้านพระพร </p>
                    <div>
                      <h4 className='text-header'>{event?.data?.name}</h4>
                    </div>
                    <div className='info-sec'><AiOutlineCalendar className="icon-size-20" /> {event?.data?.date_event}</div>
                    <div className='info-sec'><AiOutlinePushpin className="icon-size-20" /> {event?.data?.location_event}</div>
                    <div className='info-sec'><AiOutlineTeam className="icon-size-20" />จำนวน {event?.data?.total} ที่นั่ง</div>
                    <div className='info-sec'><AiOutlineDollarCircle className="icon-size-20" /> ราคา {event?.data?.ticketCost} บาท/ที่นั่ง</div>
                    <div className='mt-15'>
                      <Link href="/seats/1"><a className="btn btn-outline-light"> <AiOutlineAppstoreAdd className="icon-size-20" /> Get Tickets</a></Link>
                    </div>
                  </div>
                </div>
              </div>
              }
              
              

            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles.moviesContainer}>
          <div className='mt-15'>
          <div dangerouslySetInnerHTML={ { __html: event?.data?.detail } }></div>
            {/* <h1 className={styles.title}>
              เตรียมพบกับการกลับมาอีกครั้งของ <br></br> <span className='text-primary'> {event?.data?.date_event} </span>
            </h1>
            <h4>
              งานการกุศลมูลนิธิบ้านพระพรครั้งใหญ่ที่สุดในไทย <br></br>
              ในวัน {event?.data?.date_event}
            </h4>
            <p>iCreator Conference กลับมาอีกครั้งกับงานสัมมนารวมกลุ่มคนในวงการคอนเทนต์ครีเอเตอร์ที่ใหญ่ที่สุดในไทย เพราะที่นี่คือแหล่งรวมเหล่านักสร้างจากทุกวงการ เพื่อมาแชร์ประสบการณ์ ในการสร้างคอนเทนต์ อัปเดตเทรนด์ และก้าวผ่านอุปสรรคอัลกอริทึมไปด้วยกัน</p>
            <p>ซึ่งปี 2023 นี้เรากลับมาพร้อมธีม <b>"The Power Of NEXT Gen: พลังแห่งโลกคอนเทนต์ยุคใหม่ สู่อนาคตวงการครีเอเตอร์"</b> ทั้งพลังของคอนเทนต์ใหม่ เทรนด์ใหม่และความครีเอทีฟใหม่</p>
            <p>ที่เหล่าสปีกเกอร์ชั้นนำของประเทศ ไม่ว่าจะเป็นครีเอเตอร์ อินฟลูเอนเซอร์ รวมถึงตัวแทนจากแบรนด์ และเอเจนซีชื่อดังทุกเจนในไทย มาร่วมแชร์ประสบการณ์ สร้างแรงบันดาลใจ เติมพลังสู่ความเป็น NEXT Gen ไปด้วยกัน</p>

            <div className='highlight-container text-center'>
              <h5 className='highlight'>Speaker และครีเอเตอร์ชั้นนำของประเทศจะประกาศเร็ว ๆ นี้</h5>
            </div>
            <h5>รายละเอียดบัตร </h5>
            <p className='p-text'>1. On Sale บัตร Super Duper Early Bird : บัตรราคาพิเศษ 1,200 บาท (21 - 26 Jul.)</p>
            <p className='text-danger'>*บัตร Tier อื่น ๆ จะประกาศราคาตามมาในภายหลัง*</p>
            <h6>*หมายเหตุ :</h6>
            <p className='p-text'>1. บัตร On Ground สามารถเข้าร่วมกิจกรรม Workshop และ iCreator Clinic ได้</p>
            <p className='p-text'>2. บัตรแต่ละประเภทจะมีการกำหนดช่วงเวลาในการจำหน่าย และมีจำนวนจำกัด ซึ่งจะประกาศรายละเอียดอีกครั้ง</p>
            <br></br>
            <h6>เงื่อนไขในการซื้อบัตร</h6>
            <p className='p-text'>1. หากทำการซื้อบัตรเรียบร้อย ผู้จัดงานขอสงวนสิทธิ์ไม่คืนเงินทุกกรณี</p>
            <p className='p-text'>2. ผู้จัดงานขอสงวนสิทธิ์ไม่ให้โอนบัตรในการเข้ารับชมให้กับผู้อื่น</p>
            <p className='p-text'>3. ราคาบัตรรวมภาษีมูลค่าเพิ่ม (มีค่าธรรมเนียมการบริการเพิ่มเติม)</p>
            <br></br>
            <h6>Customer Support</h6>
            <p>หากคุณมีข้อสงสัยหรือติดปัญหาเกี่ยวกับการใช้งานระบบ สามารถติดต่อ Customer Support ได้ในเวลาทำการ ผ่านทั้ง 4 ช่องทางของเรา ดังนี้</p>
            <p className='p-text2'>ทุกวันจันทร์-อาทิตย์ 10:00 – 18:00 น.</p>
            <p className='p-text2'>Live Chat : Youtube.com/Emmy</p>
            <p className='p-text2'>E-mail : pop@eventpop.me</p>
            <p >Line@ : @eventpop</p>
            <p className='p-text'>ทุกวันจันทร์-ศุกร์ 10:00 - 18:00 น. (ยกเว้นวันเสาร์-อาทิตย์และวันหยุดนักขัตฤกษ์)</p>
            <p className='p-text'>Call Center : 062-5932224</p> */}
          </div>

        </div>
      </div>
      <div className='follow-banner'>
        <div className='bg_black'></div>
        <div className='container'>
          <div className='theme-page-section'>

            <div className="d-flex justify-content-center flex-wrap">

              <div className={'image-container2'}>
                <Image loader={myLoader} src={`${process.env.imageAPI}/mawastudio/img/${event?.data?.image}`} layout="fill" className={'image2'} />
              </div>
              <div className='event-info-desktop2 text-respon'>
                <div className='top-bot'>
                  <div>
                    <h4 className='text-header2'>{event?.data?.name}</h4>
                  </div>
                  <div className='info-sec2'><AiOutlineCalendar className="icon-size-20" /> {event?.data?.date_event}</div>
                  <div className='info-sec2'><AiOutlinePushpin className="icon-size-20" /> {event?.data?.location_event}</div>
                  <div className='info-sec2'><AiOutlineTeam className="icon-size-20" />จำนวน {event?.data?.total} ที่นั่ง</div>
                  <div className='info-sec2'><AiOutlineDollarCircle className="icon-size-20" /> ราคา {event?.data?.ticketCost} บาท/ที่นั่ง</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div className='hi-200'>.</div>
    </>
  )
}
