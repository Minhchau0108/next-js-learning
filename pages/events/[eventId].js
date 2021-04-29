import EventSummary from "../../components/events-detail/event-summary";
import EventLogistics from "../../components/events-detail/event-logistics";
import EventContent from "../../components/events-detail/event-content";
import { transformData } from "../../helper/utils";

function EventDetailPage({ event }) {
  if (!event) {
    return <h1 className='center'>Loading...</h1>;
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics {...event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;

export async function getStaticPaths() {
  const response = await fetch(
    "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const transformdata = transformData(data);
  const paths = transformdata.map((item) => ({ params: { eventId: item.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
  const eventId = params.eventId;
  const response = await fetch(
    "https://nextjs-course-1-c35f3-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();
  const transformdata = transformData(data);
  const event = transformdata.find((item) => item.id === eventId);
  if (!event) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}
