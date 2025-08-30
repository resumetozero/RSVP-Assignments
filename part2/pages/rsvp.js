import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function RSVP() {
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [status, setStatus] = useState("Yes");
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [rsvps, setRsvps] = useState([]); // New state for RSVP table

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase.from("events").select("id, title");
      setEvents(data || []);
    }
    async function fetchUsers() {
      const { data } = await supabase.from("users").select("id, name");
      setUsers(data || []);
    }
    async function fetchRsvps() {
      const { data } = await supabase
        .from("rsvps")
        .select("id, user_id, event_id, status, users(name), events(title)");
      setRsvps(data || []);
    }
    fetchEvents();
    fetchUsers();
    fetchRsvps();
  }, []);

  // Fetch RSVPs again after submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!userId || !eventId) {
      alert("Please select a user and event.");
      return;
    }
    const { error } = await supabase
      .from("rsvps")
      .insert([{ user_id: userId, event_id: eventId, status }]);
    if (error) alert(error.message);
    else {
      alert("RSVP submitted!");
      // Refresh RSVP table
      const { data } = await supabase
        .from("rsvps")
        .select("id, user_id, event_id, status, users(name), events(title)");
      setRsvps(data || []);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>RSVP to Event</h1>
        <select value={userId} onChange={e => setUserId(e.target.value)}>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <select value={eventId} onChange={e => setEventId(e.target.value)}>
          <option value="">Select Event</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>{event.title}</option>
          ))}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <h2>RSVP List</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Event</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map(rsvp => (
            <tr key={rsvp.id}>
              <td>{rsvp.users?.name || rsvp.user_id}</td>
              <td>{rsvp.events?.title || rsvp.event_id}</td>
              <td>{rsvp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}