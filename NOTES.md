---
time-spent:
---

# Notes

> Candidates, please leave any applicable notes in this file.

- Hid the admin page from teachers: admin link only shows for admins in the nav, and visiting `/admin` as a teacher redirects to `/tools`.

  - **How to Test:**
    - Log in as a teacher. Confirm no Admin link in the header. Directly navigate to `/admin` and make sure it redirects to `/tools`.
    - Log in as an admin. Confirm the Admin link appears in the header. Confirm that `/admin` loads.

- Filtered tools by teacher_tools.disabled: teachers only see tools that are not explicitly disabled for them (no row in `teacher_tools` with `disabled = true` for that teacher). Admins still see all tools.
  - **How to Test:**
    - Log in as a teacher who has tools disabled in seed data (e.g. teacher3@north-ridge.edu has Lesson Planner and Reading Coach disabled). Go to `/tools` and confirm those tools do not appear; other tools do appear.
    - Log in as a teacher with no disabled tools (need to update seed data or manually change in Supabase Studio UI). Go to `/tools` and confirm all tools appear.
    - Log in as an admin. Go to `/tools` and confirm all tools appear.
