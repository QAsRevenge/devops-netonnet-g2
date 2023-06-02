// import clsx from 'clsx'

// import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { generateDate, months } from '@/util/calendar'
import { cn } from '@/util/cn'
import dayjs from 'dayjs'
import { useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

export function Pricing() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const currentDate = dayjs()
  const [today, setToday] = useState(currentDate)
  const [selectedDate, setSelectedDate] = useState(currentDate)

  return (
    <section id="pricing" aria-label="Pricing" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto flex w-2/3 items-center gap-10 divide-x-2">
          <div className="h-96 w-96 bg-white">
            <div className="flex justify-between">
              <h1 className="font-semibold">
                {months[today.month()]}, {today.year()}
              </h1>
              <div className="item-center flex gap-5">
                <GrFormPrevious
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => {
                    setToday(today.month(today.month() - 1))
                  }}
                />
                <h1
                  className="cursor-pointer"
                  onClick={() => {
                    setToday(currentDate)
                  }}
                >
                  Today
                </h1>
                <GrFormNext
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => {
                    setToday(today.month(today.month() + 1))
                  }}
                />
              </div>
            </div>
            <div className=" grid w-full grid-cols-7 text-gray-500">
              {days.map((day, index) => {
                return (
                  <h1
                    key={index}
                    className="grid h-14 place-content-center text-sm"
                  >
                    {day}
                  </h1>
                )
              })}
            </div>
            <div className=" grid w-full grid-cols-7">
              {generateDate(today.month(), today.year()).map(
                ({ date, currentMonth, today }, index) => {
                  return (
                    <div
                      key={index}
                      className="grid h-14 place-content-center border-t text-sm"
                    >
                      <h1
                        className={cn(
                          'grid h-12 w-12 cursor-pointer place-content-center rounded-full hover:bg-black hover:text-white ',
                          currentMonth ? '' : 'text-gray-400',
                          today ? ' bg-red-600 text-white' : '',
                          selectedDate.isSame(date, 'day')
                            ? 'bg-black text-white'
                            : ''
                        )}
                        onClick={() => {
                          setSelectedDate(date)
                        }}
                      >
                        {date.date()}
                      </h1>
                    </div>
                  )
                }
              )}
            </div>
          </div>
          <div className="h-96 w-96 px-5">
            <h1 className="font-semibold">
              Schedule for {selectedDate.toDate().toDateString()}
            </h1>
            <p>No mettings for today.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
