import { ButtonPagination } from '../../ui/ButtonPagination'
import styles from './Pagination.module.css'
import { BsChevronDoubleRight } from 'react-icons/bs'
import { BsChevronDoubleLeft } from 'react-icons/bs'

export const Pagination = ({ sumPages, currentPage, onSetCurrentPage }) => {
   const pages = []

   for (let i = 1; i <= sumPages; i++) {
      pages.push(i)
   }

   const indexCurrentPage = pages.findIndex((item) => item === currentPage)

   const pagination = pages
      .map((item, index) => {
         if (index === 0) return item
         if (index === indexCurrentPage - 3) return 'leftShevron'
         if (index === indexCurrentPage - 2) return item
         if (index === indexCurrentPage - 1) return item
         if (index === indexCurrentPage) return item
         if (index === indexCurrentPage + 1) return item
         if (index === indexCurrentPage + 2) return item
         if (index === indexCurrentPage + 3 && index !== pages.length - 1) return 'rightShevron'
         if (index === pages.length - 1) return item
      })
      .filter((item) => item)

   return (
      <div className={styles.pagination}>
         {!!pagination.length &&
            pagination.map((item) => {
               if (item === 'rightShevron') return <BsChevronDoubleRight key={item} />
               if (item === 'leftShevron') return <BsChevronDoubleLeft key={item} />

               return (
                  <ButtonPagination
                     disabled={currentPage === item}
                     currentPage={currentPage}
                     key={item}
                     id={item}
                     onClick={() => onSetCurrentPage(item)}
                  >
                     {item}
                  </ButtonPagination>
               )
            })}
      </div>
   )
}
