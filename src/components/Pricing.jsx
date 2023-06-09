// import clsx from 'clsx'

// import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { generateDate, months } from '@/util/calendar'
import { cn } from '@/util/cn'
import dayjs from 'dayjs'
import { useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export function Pricing() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const currentDate = dayjs()
  const [today, setToday] = useState(currentDate)
  const [selectedDate, setSelectedDate] = useState(currentDate)
  const [todo, setTodo] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 100000)
  }

  const handleKeyUp = (key) => {
    if (key === 'Enter' && newTodo) {
      const randomNumber = getRandomNumber()
      const newItem = {
        id: `item-${randomNumber}`,
        content: newTodo,
      }

      setTodo(todo.concat(newItem))
      setNewTodo('')
    }
  }

  const handleDelete = (id) => {
    if (id > -1) {
      setTodo(todo.filter((item) => item.id !== todo[id].id))
    }
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleOnDragEnd = (result) => {
    const { destination, source } = result

    if (!destination) {
      return
    }

    const items = reorder(todo, source.index, destination.index)
    setTodo(items)
  }

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
            <h1 className="font-semibold shadow-md">
              Schedule for {selectedDate.toDate().toDateString()}
            </h1>
            <p className="pt-1">Meetings for today.</p>
            <div className="absolut inset-y-o pointer-events-none left-2 flex items-center pl-3"></div>
            <input
              type="text"
              id="newTodo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyUp={(e) => handleKeyUp(e.key)}
              className="block w-full rounded-full border-2 bg-white p-2 pl-10 text-black placeholder-gray-500"
              placeholder="Add new todo or meeting"
            />
                    <ul className="block w-full pt-6">
                      {todo?.map((item, index) => {
                        return (
                          
                                <li
                                  key={item.id}
                                  className="mt-2 w-full rounded-xl border-2 hover:border-blue-300"
                                >
                                  <input
                                    id={index}
                                    type="checkbox"
                                    className="float-left m-3 block h-6 w-6"
                                  />
                                  <button
                                    id={index}
                                    onClick={() => handleDelete(index)}
                                    className="float-right m-2.5 h-7 w-7 rounded-2xl bg-red-700 text-gray-200 shadow-md hover:scale-105 hover:bg-red-500"
                                  >
                                    x
                                  </button>
                                  <label
                                    htmlFor={index}
                                    className="block w-full p-3"
                                  >
                                    {item.content}
                                  </label>
                                </li>
                              
                            )}
              )
            }
                      
                    </ul>
                    
              
          </div>
        </div>
      </Container>
    </section>
  )
}
