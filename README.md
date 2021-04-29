### App HomeMed Events

---

### File-based

| Option          | Description                                |
| --------------- | ------------------------------------------ |
| /               | Starting Page                              |
| /events         | Events Page (show all event)               |
| /events/[id]    | Event Detail Page (show selected Event)    |
| /events/...slug | Filtered Event Page (show filtered events) |

---

### Navigate Page Progammactically

1. Push to URL

```
import { useRouter } from "next/router";
export default function AllEventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };
  //....
}


```

2. Get from URL

```
import { useRouter } from "next/router";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p>Loading...</p>;
  }
  const numYear = +filterData[0];
  const numMonth = +filterData[1];
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
      </>
    );
  }
  return (
    <>
      <EventList items={events} />
    </>
  );
}

```
