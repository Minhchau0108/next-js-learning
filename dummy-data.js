const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Vaccines for COVID-19",
    description:
      "How to use vaccines and monoclonal antibodies to protect and treat against COVID-19. Vaccines vs Monoclonal Antibodies for COVID-19: Complementary Approaches to Tackling the Pandemic",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image: "images/vaccine.jpeg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Therapies for Parkinson Disease",
    description:
      "Join our experts as they discuss how on-demand therapies fit within the armamentarium of PD. - it'll be so much easier. Promised!",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image: "images/parkison.jpeg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Challenges in Acne Management",
    description:
      "An interprofessional panel of experts discusses the roles of immunotherapies and biomarkers in the treatment of melanoma",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image: "images/acne.jpeg",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}
