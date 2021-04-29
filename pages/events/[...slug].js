import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p>Loading...</p>;
  }
  const numYear = +filterData[0];
  const numMonth = +filterData[1];
  if (isNaN(numYear) || isNaN(numMonth)) {
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
  const events = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!events || events.length === 0) {
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
      <EventList items={events} />
    </>
  );
}
