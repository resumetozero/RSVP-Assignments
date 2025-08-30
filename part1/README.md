## 📌 Project: Event RSVP Database (Supabase)

### 🔧 1. Overview

This project designs a database for an event management platform where:

* Users can **register**.
* Users can **create events**.
* Other users can **RSVP (Yes/No/Maybe)** to those events.

The database is implemented in **Supabase (Postgres)**.

---

### 🗂️ 2. Schema Design

#### **Tables**

1. **Users**

   * `id` (UUID, PK)
   * `name` (Text, Required)
   * `email` (Unique, Required)
   * `created_at` (Timestamp, Default = now)

2. **Events**

   * `id` (UUID, PK)
   * `title` (Text, Required)
   * `description` (Text, Optional)
   * `date` (Date, Required)
   * `city` (Text)
   * `created_by` (UUID, FK → Users.id, ON DELETE CASCADE)

3. **RSVPs**

   * `id` (UUID, PK)
   * `user_id` (UUID, FK → Users.id, ON DELETE CASCADE)
   * `event_id` (UUID, FK → Events.id, ON DELETE CASCADE)
   * `status` (Enum: Yes, No, Maybe)

#### **Constraints**

* `PRIMARY KEY` on all tables
* `UNIQUE` email in Users
* `ON DELETE CASCADE` ensures referential integrity
* `status` restricted to enum values

---

### 📐 3. ER Diagram

(Insert your Supabase ER diagram screenshot here, e.g. `ER-diagram.png`)

---

### 📊 4. Sample Data

#### Users (10 records)

Example:

| id | name  | email                                         | created\_at |
| -- | ----- | --------------------------------------------- | ----------- |
| …  | Alice | [alice@example.com](mailto:alice@example.com) | 2025-08-30  |
| …  | Bob   | [bob@example.com](mailto:bob@example.com)     | 2025-08-30  |

#### Events (5 records)

Example:

| id | title       | city      | date       | created\_by |
| -- | ----------- | --------- | ---------- | ----------- |
| …  | Tech Meetup | Bengaluru | 2025-09-15 | Alice’s id  |
| …  | AI Workshop | Delhi     | 2025-09-20 | Bob’s id    |

#### RSVPs (20 records)

Example:

| id | user\_id | event\_id | status |
| -- | -------- | --------- | ------ |
| …  | Alice    | Meetup    | Yes    |
| …  | Bob      | Workshop  | No     |

(Full data included in `users.csv`, `events.csv`, `rsvps.csv`)

---

### 📝 5. Export Instructions

Since Supabase free tier does not support backups, the following method was used:

* Schema exported via:

  ```sql
  SELECT table_name, pg_get_tabledef(format('%I.%I', table_schema, table_name)::regclass)
  FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type='BASE TABLE';
  ```
* Data exported manually with:

  ```sql
  SELECT * FROM Users;
  SELECT * FROM Events;
  SELECT * FROM RSVPs;
  ```
* Saved into CSV files (`users.csv`, `events.csv`, `rsvps.csv`).

---

### ✅ 6. Design Choices

* **UUIDs** as IDs for scalability and uniqueness across distributed systems.
* **ON DELETE CASCADE** ensures that deleting a User also deletes their Events and RSVPs.
* **Enum type** restricts RSVP status strictly to `Yes`, `No`, or `Maybe`.
* **Many-to-many relationship** between Users and Events is handled by the `RSVPs` join table.

---

### 📦 7. Deliverables

* `schema.sql` → Database schema
* `users.csv`, `events.csv`, `rsvps.csv` → Sample data
* `ER-diagram.png` → ER Diagram screenshot
* `README.md` → Documentation
