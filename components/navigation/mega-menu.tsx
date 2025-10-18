"use client"

import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import endpoints from "@/lib/endpoints/endponts"
import { useDispatch, useSelector } from "react-redux"
import { getListData } from "@/lib/customfetch/customFetch"

const MegaMenu = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftFade, setShowLeftFade] = useState(false)
  const [showRightFade, setShowRightFade] = useState(false)

  const { categories } = useSelector((state: any) => state?.reduxData?.data)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    await getListData(dispatch, "categories", endpoints?.categories?.getAllcategories)
  }

  const handleClickCategory = (id: any) => {
    router.push(`/product_filter?categoryId=${id}`)
  }

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" })
  }

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" })
  }

  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollEl
      setShowLeftFade(scrollLeft > 0)
      setShowRightFade(scrollLeft + clientWidth < scrollWidth - 5)
    }

    handleScroll()
    scrollEl.addEventListener("scroll", handleScroll)

    const resizeObserver = new ResizeObserver(handleScroll)
    resizeObserver.observe(scrollEl)

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll)
      resizeObserver.disconnect()
    }
  }, [categories])

  return (
    <div className="relative w-full bg-white shadow-sm py-3">
      <div className="relative flex items-center justify-center">
        {/* Left Scroll Button */}
        {showLeftFade && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 z-20 bg-white/70 hover:bg-white text-pink-600 rounded-full p-2 shadow-sm hover:shadow-md border border-pink-100 transition-all duration-200 hover:scale-110"
            aria-label="Scroll Left"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-10 scroll-smooth"
        >
          {categories?.categories?.map((category: any) => (
            <button
              key={category?.id}
              onClick={() => handleClickCategory(category?.id)}
              className="flex-shrink-0 flex flex-col items-center w-16 sm:w-20 group"
            >
              <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-pink-300">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}uploads/${category?.image}`}
                  alt={category?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-gray-700 mt-1.5 group-hover:text-pink-600 text-center truncate w-full">
                {category?.name}
              </p>
            </button>
          ))}
        </div>

        {/* Right Scroll Button */}
        {showRightFade && (
          <button
            onClick={scrollRight}
            className="absolute right-2 z-20 bg-white/70 hover:bg-white text-pink-600 rounded-full p-2 shadow-sm hover:shadow-md border border-pink-100 transition-all duration-200 hover:scale-110"
            aria-label="Scroll Right"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Left Fade */}
      {showLeftFade && (
        <div className="pointer-events-none absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
      )}

      {/* Right Fade */}
      {showRightFade && (
        <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white via-white/70 to-transparent z-10" />
      )}

      {/* Hide Scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default MegaMenu
