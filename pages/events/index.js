import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../dummy-data";
export default function AllEventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </>
  );
}
