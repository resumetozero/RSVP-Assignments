import { supabase } from "../lib/supabaseClient";

export default function Home({ events }) {
  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date} - {event.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  return { props: { events } };
}
