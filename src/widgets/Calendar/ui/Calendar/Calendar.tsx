import * as dayjs from 'dayjs';
import { useState } from 'react';
import { Month } from '../Month/ui/Month';

const dateNow = dayjs();

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(dateNow);
  return (
    <div className="bg-white rounded shadow w-full">
      <Header />
      <Month day={currentDate} />
    </div>
  );
}

function Header() {
  return (
    <div className="header flex justify-between border-b p-2">
      <span className="text-lg font-bold">2020 July</span>
      <div className="buttons">
        <button className="p-1">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-left-circle"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              fillRule="evenodd"
              d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
            />
            <path
              fillRule="evenodd"
              d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
            />
          </svg>
        </button>
        <button className="p-1">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-arrow-right-circle"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              fillRule="evenodd"
              d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
            />
            <path
              fillRule="evenodd"
              d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
