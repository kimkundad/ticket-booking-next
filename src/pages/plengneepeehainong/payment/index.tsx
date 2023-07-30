import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

import { Movie, Seats } from '../../../constants/models/Movies'
import styles from './Payment.module.scss'
import MoviesContext from '../../../context/MoviesContext';
import { useGetSeats, useCheckSeasts } from '../../../services/movies'
import axios from 'axios'

const Tickets = () => {
  const { movies, setMovies } = useContext(MoviesContext);
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  const [getDatacon, setGetDatacon] = useState<any>([]);

  const [usebtn, setUsebtn] = useState<Number>(0);
  const [usetotal, setUsetotal] = useState(0);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  let movieSeatDetails: Seats = {};
  let bookingChargePerTicket = 20, ticketCost: number, bookingFee: number, totalCost: number;
  const {movieId, seatDetails}: any = router.query;

  const { movie, isLoading, isError } = useGetSeats(movieId);

  if (seatDetails) {
    movieSeatDetails = JSON.parse(seatDetails);
  }

  console.log('-->', movieSeatDetails)

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsTimerCompleted(true);
    }
  });

  const computeSelectedSeats = () => {
    let selectedSeats: string[] = [];

    for(let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex+1}`)
        }
      })
    }
    
    return selectedSeats;
  }

  const RenderSeatDetails = ({selectedSeats}: {selectedSeats: string[]}) => {
    ticketCost = selectedSeats.length*(movie?.ticketCost||0);
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(', ')} ({selectedSeats.length} Tickets)
        </div>
        <div className={styles.seatCost}>
          Rs.{ticketCost}
        </div>
      </div>
  )}



  const RenderTotalCharge = ({selectedSeats}: {selectedSeats: string[]}) => {
    totalCost = ticketCost;
    setUsetotal(totalCost)
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          Total
        </div>
        <div className={styles.seatCost}>
          Rs.{totalCost}
        </div>
      </div>
  )}

  const modifiedSeatValue = () => {
    let newMovieSeatDetails = {...movieSeatDetails};
    for(let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          movieSeatDetails[key][seatIndex] = 1;
        }
      })
    }
    return newMovieSeatDetails;
  }

  const onConfirmButtonClick = async () => {
    let movieIndex = movies.findIndex(mov => mov.id === parseInt(movieId));
    if (movieIndex !== -1 && setMovies) {
      movies[movieIndex].seats = modifiedSeatValue();
      console.log(movies);
      setMovies(movies);
      router.push('/plengneepeehainong');
    }
  }

  const RenderConfirmButton = () => {
    return (
      <div className={styles.paymentButtonContainer}>
        <Button variant="contained" disabled={isTimerCompleted} className={styles.paymentButton} onClick={onConfirmButtonClick}>
         {isTimerCompleted ? 'Confirm Booking' : `Confirm Booking (${seconds})` }
        </Button>
      </div>
    )
  }

  useEffect(() => {
    
    let selectedSeats: string[] = computeSelectedSeats();
    setGetDatacon(selectedSeats)

    if(selectedSeats.length === 0){
      router.back()
    }
    

    axios.post(`${process.env.API}/useCheckSeasts/${movieId}`, {selectedSeats}).then(
    response => {
      console.log('selectedSeats', selectedSeats);
      setUsebtn(response.status)
    } )

  }, []);

  const RenderCard = () => {
    let selectedSeats: string[] = computeSelectedSeats();
    if (!movie) return <div>loading...</div>


    return (
    <div className={styles.card}>
      <div className={styles.cardTitleContainer}>
        <Link href={{ pathname: `/plengneepeehainong/seats/${movie?.id}`, query: { seats: isTimerCompleted ? null : JSON.stringify(seatDetails) }}}><ArrowBackIcon /></Link>
        <div className={styles.cardTitle3}>
         สรุปรายการจอง
        </div>
      </div>
        <p className={styles.movieName}>{movie.name}</p>
      <RenderSeatDetails selectedSeats={selectedSeats}/>
      <hr className={styles.hrStyle}/>
      <RenderTotalCharge selectedSeats={selectedSeats}/>
      {usebtn === 200 &&
        <div className={styles.paymentButtonContainer}>
          <Link href={{ pathname: '/plengneepeehainong/confirmPayment', query: { movieId: movie?.id, seatDetails: getDatacon, usetotal: usetotal, seats: isTimerCompleted ? null : JSON.stringify(seatDetails) } }}>
          <Button variant="contained" className={styles.paymentButton} >
             Confirm Booking
          </Button>
          </Link>
        </div>
      }

      {usebtn === 204 &&
      <>
      <div className="alert alert-warning mt-15" role="alert">
      มีการกดจองที่นั่งของคุณก่อนหน้านี้แล้ว กรุณาเลือกที่นั่งใหม่!
      </div>
      <Link href={{ pathname: `/plengneepeehainong/seats/${movie?.id}`, query: { seats: isTimerCompleted ? null : JSON.stringify(seatDetails) }}}><button type="button" className="btn btn-secondary">กลับไปเลือกที่นั่งใหม่</button></Link>
      </>
      }
      
    </div>
    )
  }
  
  return (
    <>
      <Head>
        <title>Payment Page</title>
      </Head>
      <div className={styles.container}>
        <RenderCard />
      </div>
    </>
  );
}
 
type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}

export default Tickets;