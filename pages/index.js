import { useState, useEffect } from "react";
import EventList from "../components/events/event-list";
import { transformData } from "../helper/utils";

export default function HomePage(props) {
  const [events, setEvents] = useState(props.events);

  useEffect(() => {
    const fetchFeatureEvents = async () => {
      const response = await fetch(
        "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/events.json"
      );
      const data = await response.json();
      const transformdata = transformData(data);
      setEvents(transformdata.filter((e) => e.isFeatured));
    };

    fetchFeatureEvents();
  }, []);
  if (!events) {
    return <div>No events</div>;
  }

  return <div>{<EventList items={events} />}</div>;
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const transformdata = transformData(data);
  return {
    props: {
      events: transformdata.filter((e) => e.isFeatured),
    },
    revalidate: 1800,
  };
}
