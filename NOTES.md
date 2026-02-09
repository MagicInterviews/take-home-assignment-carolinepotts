---
time-spent:
---

# Notes

> Candidates, please leave any applicable notes in this file.

- Hid the admin page from teachers: admin link only shows for admins in the nav, and visiting `/admin` as a teacher redirects to `/tools`.
  - **How to Test:**
    - Log in as a teacher. Confirm no Admin link in the header. Directly navigate to `/admin` and make sure it redirects to `/tools`.
    - Log in as an admin. Confirm the Admin link appears in the header. Confirm that `/admin` loads.
