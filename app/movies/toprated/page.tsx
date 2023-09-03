'use client'
import { getTopRatedMovies } from '@/app/services/movies'
import { useEffect, useState } from 'react'
import CardMovie from '../../components/fragments/CardMovie'
import Pagination from '@/app/components/fragments/Pagination'

const TopRatedPage = () => {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getTopRatedMovies(page, (res: any) => {
      setMovies(res.data.results)
      setTotalPages(res.data.total_pages)
    })
  }, [page])

  const nextPage = () => {
    setPage(page === totalPages ? page : page + 1)
  }

  const prevPage = () => {
    setPage(page <= 1 ? 1 : page - 1 )
  }

  return (
    <>
    <div className='grid grid-cols-3 gap-2 px-3 md:px-5 lg:px-10 md:grid-cols-4 md:gap-3 lg:grid-cols-5 2xl:grid-cols-10 lg:gap-5 top-28 absolute -z-10'>
      {movies.map((movie: any) => (
      <CardMovie key={movie.id} id={movie.id} title={movie.title} poster={movie.poster_path} rating={ movie.vote_average } />
      ))}
        <Pagination totalPage={totalPages} currentPage={page} nextPage={nextPage} prevPage={prevPage} />
    </div>
    </>
  )
}

export default TopRatedPage