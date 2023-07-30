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
    return `${process.env.imageAPI}/mawastudio/img/mawa_logo.png`;
  }

  return (
    <>
      <Head>
        <title>Book My Ticket | Home</title>
      </Head>
      <div className="container">
      <div className="d-flex justify-content-center">
        <h2 className='mt-30'>
          coming soon
        </h2>
      </div>
      </div>
    </>
  )
}
