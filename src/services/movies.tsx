import axios from 'axios'
import useSWR from 'swr'
import { Seats } from '../constants/models/Movies'

function useGetMovies () {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`/api/movies`, fetcher)

  return {
    movies: data,
    isLoading: !error && !data,
    isError: error
  }
}


function useGetEvent () {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`${process.env.API}/get_event/1`, fetcher)

  return {
    event: data,
    isLoading: !error && !data,
    isError: error
  }
}

//${process.env.API}/get_seats/${$id} getDataOrder
function useGetSeats ($id: string) {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`${process.env.API}/get_seats/${$id}`, fetcher)

  return {
    seatsx: data,
    movie: data,
    isLoading: !error && !data,
    isError: error
  }
}


function useGetOrder ($id: string) {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`${process.env.API}/getDataOrder/${$id}`, fetcher)

  return {
    order: data,
    isLoading: !error && !data,
    isError: error
  }
}

function useGetMovieById (id: string) {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, error } = useSWR(`/api/movies/${id}`, fetcher)

  return {
    movie: data,
    isLoading: !error && !data,
    isError: error
  }
}
//useCheckSeasts
async function useCheckSeasts (movieId: string, selectedSeats: any) {
   await axios.post(`${process.env.API}/useCheckSeasts/${movieId}`, {selectedSeats}).then(
    response => {
      console.log(response.data);
      return response.data
    } 
    )
}

async function useBookTicketByMovieId (id: string, seatDetails: Seats) {
  return await axios.put(`/api/movies/${id}`, {seatDetails})
}

export {
  useGetMovies,
  useGetMovieById,
  useBookTicketByMovieId,
  useGetSeats,
  useCheckSeasts,
  useGetOrder,
  useGetEvent
}