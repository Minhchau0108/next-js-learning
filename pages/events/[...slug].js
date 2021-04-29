import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { transformData } from "../../helper/utils";

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();

  const router = useRouter();
  const filterData = router.query.slug;

  // get all events
  const { data, error } = useSWR(
    "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/events.json"
  );
  useEffect(() => {
    if (data) {
      setLoadedEvents(transformData(data));
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  if (isNaN(numYear) || isNaN(numMonth) || error) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList items={filteredEvents} />
    </>
  );
}
// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;
//   const numYear = +filterData[0];
//   const numMonth = +filterData[1];
//   if (isNaN(numYear) || isNaN(numMonth)) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }
//   const response = await fetch(
//     "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/events.json"
//   );
//   const data = await response.json();

//   const transformdata = transformData(data);
//   let filteredEvents = transformdata.filter((event) => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === numYear &&
//       eventDate.getMonth() === numMonth - 1
//     );
//   });
//   return {
//     props: {
//       events: filteredEvents,
//       year: numYear,
//       month: numMonth,
//     },
//   };
// }
