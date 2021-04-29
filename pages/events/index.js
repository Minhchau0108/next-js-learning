import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { transformData } from "../../helper/utils";

export default function AllEventsPage({ events }) {
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const transformdata = transformData(data);
  return {
    props: {
      events: transformdata,
    },
    revalidate: 60,
  };
}
