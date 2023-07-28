import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { Button } from '@mui/material';
import { AiOutlineCalendar, AiOutlinePushpin, AiOutlineTeam, AiOutlineDollarCircle, AiOutlineAppstoreAdd } from "react-icons/ai";
import { Movie, Seats } from '../../constants/models/Movies'
import styles from './Seats.module.scss'
import MoviesContext from '../../context/MoviesContext';
import { useGetSeats } from '../../services/movies'

const Seats = () => { 

  

  const { movies } = useContext(MoviesContext);
  const router = useRouter()
  let selectedSeats: string[] = [];
  
  const { id, seats }: any = router.query
  
  const movie = movies.find(mov => mov.id === parseInt(id));
  const [seatDetails, setSeatDetails] = useState<Seats | undefined>(movie?.seats || {});

  const { seatsx, isLoading, isError } = useGetSeats(id);

  console.log('next-->', movie?.seats)
  console.log('api-->', router.query.id)
  
  useEffect(() => { 
    if (!seats) {
      clearSelectedSeats();
    }
  }, [])

  useEffect(() => { 
    setSeatDetails(seatsx?.group)
  },)

  const clearSelectedSeats = () => {
    let newMovieSeatDetails = {...seatDetails};
    for(let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      })
    }
    setSeatDetails(newMovieSeatDetails);
  }

  const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
    if (seatDetails) {
      if (seatValue === 1 || seatValue === 3) {
        return;
      } else if (seatValue === 0) {
        seatDetails[key][rowIndex] = 2; 
      } else {
        seatDetails[key][rowIndex] = 0; 
      }
    }
    setSeatDetails({...seatDetails});
  }

  /**
   * 0 - Not booked
   * 1 - Booked
   * 2 - Selected
   * 3 - Blocked
   */
  const getClassNameForSeats = (seatValue: number) => {
    let dynamicClass;
    if (seatValue === 0) {  // Not booked
      dynamicClass = styles.seatNotBooked;
    }else if (seatValue === 1) {  // booked
      dynamicClass = styles.seatBooked;
    } else if (seatValue === 2) {  // Seat Selected
      dynamicClass = styles.seatSelected;
    } else { // Seat Blocked
      dynamicClass = styles.seatBlocked;
    }
    return `${styles.seats} ${dynamicClass}`
  }

  const RenderSeats = () => {
    let seatArray = [];
    for(let key in seatDetails) {
      let colValue = seatDetails[key].map((seatValue, rowIndex) => (
        <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
          {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
          {rowIndex === 25 && <span className={styles.colName}>{key}</span>}
          {rowIndex === 50 && <span className={styles.colName}>{key}</span>}
          {rowIndex === 75 && <span className={styles.colName}>{key}</span>}
          {rowIndex === 100 && <span className={styles.colName}>{key}</span>}
          <span className={getClassNameForSeats(seatValue)} onClick={() => onSeatClick(seatValue, rowIndex, key)}>
            {rowIndex+1} 
          </span>
          {seatDetails && rowIndex === seatDetails[key].length-1 && <><br/><br/></>}
          {rowIndex === 24 && <><br/><br/></>}
          {rowIndex === 49 && <><br/><br/></>}
          {rowIndex === 74 && <><br/><br/></>}
          {rowIndex === 99 && <><br/><br/></>}
        </span>
      ))
      seatArray.push(colValue);
    }
    return (
      <div className={styles.seatsLeafContainer}>{seatArray}</div>
    ) 
  }

  const RenderPaymentButton = () => {
    selectedSeats = [];
    for(let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex+1}`)
        }
      })
    }
    if (selectedSeats.length) {
      return (
        <Link href={{ pathname: '/payment', query: { movieId: movie?.id, seatDetails: JSON.stringify(seatDetails) } }}>
          <div className={styles.paymentButtonContainer}>
            <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
            ราคารวม {selectedSeats.length*(movie?.ticketCost || 0)} บาท
            </Button>
          </div>
        </Link>
      )
    } else {
      return <></>
    }
  }

  const myLoader=()=>{
    return `${process.env.imageAPI}/mawastudio/img/${seatsx?.event?.image}`;
  }
    
  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>Seats</title>
      </Head>
      <div className='follow-banner'>
        <div className='bg_black'></div>
        <div className='container'>
          <div className='theme-page-section'>

            <div className="d-flex justify-content-center flex-wrap">

              <div className={'image-container2'}>
                <Image loader={myLoader} src={`${process.env.imageAPI}/mawastudio/img/${seatsx?.event?.image}`} layout="fill" className={'image2'} />
              </div>
              <div className='event-info-desktop2 text-respon'>
                <div className='top-bot'>
                  <div>
                    <h4 className='text-header2'>{seatsx?.event?.name}</h4>
                  </div>
                  <div className='info-sec2'><AiOutlineCalendar className="icon-size-20" /> {seatsx?.event?.date_event}</div>
                  <div className='info-sec2'><AiOutlinePushpin className="icon-size-20" /> {seatsx?.event?.location_event}</div>
                  <div className='info-sec2'><AiOutlineTeam className="icon-size-20" />จำนวน {seatsx?.event?.total} ที่นั่ง</div>
                  <div className='info-sec2'><AiOutlineDollarCircle className="icon-size-20" /> ราคา {seatsx?.event?.ticketCost} บาท/ที่นั่ง</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div className='hi-70'></div>
      <div className="content text-center">
      <div className="d-flex justify-content-center">
      <div className={'image-container3'}>
      <Image src="/screen.svg" layout="fill" className={'image3'} />
      <p className='pt-20 text-name-se'>หน้าเวที</p>
      </div>
      </div>
        <br></br>
      </div>
      <div className={styles.seatsContainer}>

        {seatDetails && <RenderSeats />}
        <RenderPaymentButton />
      </div>
      <div className='hi-200'>.</div>
    </>
  );
}

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}
 
export default Seats;