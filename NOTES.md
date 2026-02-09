---
time-spent:
---

# Notes

### Fixed Defects:

- Hid the admin page from teachers: admin link only shows for admins in the nav, and visiting `/admin` as a teacher redirects to `/tools`.

  - **How to Test:**
    - Log in as a teacher. Confirm no Admin link in the header. Directly navigate to `/admin` and make sure it redirects to `/tools`.
    - Log in as an admin. Confirm the Admin link appears in the header. Confirm that `/admin` loads.

- Filtered tools by teacher_tools.disabled: teachers only see tools that are not explicitly disabled for them (no row in `teacher_tools` with `disabled = true` for that teacher). Admins still see all tools.

  - **How to Test:**
    - Log in as a teacher who has tools disabled in seed data (e.g. teacher3@north-ridge.edu has Lesson Planner and Reading Coach disabled). Go to `/tools` and confirm those tools do not appear; other tools do appear.
    - Log in as a teacher with no disabled tools (need to update seed data or manually change in Supabase Studio UI). Go to `/tools` and confirm all tools appear.
    - Log in as an admin. Go to `/tools` and confirm all tools appear.

### New Feature: Add support for "Grade Level"

- **Admins are able to assign a Grade Level to a tool.**

  - **Database:** Added a `grade_level_enum` type (pre-K, K, 1–12) and a `grade_levels` array column on `tools`. The migration was run locally using `pnpm db:migrate` and `pnpm db:gen-types` to regenerate types.
  - **Seeds:** Seed data in `03_tools.sql` assigns sample grade levels to each tool (e.g. Lesson Planner K–5, Reading Coach pre-K–3).
  - **Backend:** The tools API route now selects and returns `grade_levels`, and tools are ordered by name so their order stays consistent when you save updates. A server action `updateTool` in `tools/actions.ts` allows admins to update a tool’s `grade_levels` (with validation against the allowed enum values).
  - **Frontend:** On the tools page, admins see an “Edit” button on each tool card. Clicking it shows checkboxes for all grade levels; admins can select/deselect and save. Non-admins see the assigned grade levels as read-only badges.
  - **How to Test:**
    - Log in as an admin. Go to `/tools`. Click “Edit” on a tool, change the grade level checkboxes, and save. Confirm the badges update and a refresh shows the new values. Confirm that the order of the tools does not change. Confirm that the grade levels show in grade level order.
    - Log in as an admin. Go to `/tools`. Click “Edit” on a tool, change the grade level checkboxes, and click Cancel. Confirm the badges do not update to the new values.
    - Log in as a teacher. Go to `/tools`. Confirm grade level badges are visible but there is no Edit button.

- **Teachers can filter tools by Grade Level on the /tools page.**

  - Teachers and admins see grade-level filter(s) on `/tools` and can narrow the list to tools that support one or more selected grade levels. Filtering works together with the existing search (by name/description).
  - **How to Test:**
    - **No tools match:** With filters and/or search applied so that no tools match, confirm the UI shows a clear “No tools match your search and filters” (or equivalent) message rather than an empty list with no explanation. Confirm that the "No tools match" message works for: filters only (e.g. select a grade that no tool has), search only (e.g. type a string that matches nothing), and filters + search combined.
    - **Filters only:** Apply only grade-level filters (no search). Confirm only tools that support all selected grades appear. Confirm number of tools in the helper text under the "Tools for (Name)" header is correct (e.g. "Showing 1 of 2 tools"). Confirm the number of selected filters is correct (e.g. "Filters (1)").
    - **Search only:** Apply only search (no filters). Confirm only tools matching the search text appear.
    - **Multiple filters & search:** Select multiple grade levels and enter search text. Confirm the list shows tools that (1) match the search and (2) support all of the selected grade levels. Change filters or search and confirm the list updates accordingly.

- **Admins are able to assign Grade Levels to teachers.**

  - **Database:** Added a `grade_levels` array column on `teachers` (same `grade_level_enum` as tools: pre-K, K, 1–12). The migration was run locally using `pnpm db:migrate` and `pnpm db:gen-types` to regenerate types.
  - **Seeds:** Seed data in `02_teachers.sql` assigns sample grade levels to each teacher (e.g. K–5, pre-K–3). Ran `pnpm db:reset` to refresh seed data.
  - **Backend:** The admin API route now selects and returns `grade_levels` for teachers. A server action `updateTeacher` in `admin/actions.ts` allows admins to update a teacher’s `grade_levels` (with validation against the allowed enum values).
  - **Frontend:** On the admin page, admins see an “Edit” button on each teacher card. Clicking it shows checkboxes for all grade levels; admins can select/deselect and save. Teachers’ grade levels are shown as read-only badges when not editing.
  - **How to Test:**
    - Log in as an admin. Go to `/admin`. Click “Edit” on a teacher, change the grade level checkboxes, and save. Confirm the badges update and a refresh shows the new values.
    - Log in as an admin. Go to `/admin`. Click “Edit” on a teacher, change the grade level checkboxes, and click Cancel. Confirm the badges do not update to the new values.
