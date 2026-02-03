# MagicDash

> MagicDash is a multi-organization school management system with these core entities:

- Organizations
- Admins
- Teachers
- Tools

## Features

- MagicDash supports multiple organizations, each with their own admins.
- Admins can view teachers in their organization.
- Teachers can view tools assigned to them.

## Routes

- `/admin` => admins can manage teachers on this page
- `/tools` => teachers can view tools on this page

Both pages already exist in some form, but are intentionally incomplete.

## The Tasks

1. Find the level you are interviewing for below and complete the tasks in that section. The levels are Associate Software Engineer, Software Engineer, or Senior+ Software Engineer. Please reach out if you are unsure of which level you should complete this exercise for.
2. Ensure the program runs and core flows are functional.
3. Document what you did and how you approached your work in **[NOTES.md](./NOTES.md)**.
4. If you find yourself with extra time, make it shine (improve the: style, UX, architecture, performance at scale, clarity, quality, or correctness of the application).

### Associate Software Engineer

1. Fix the following defects:
   - **a.** The admin page is showing for teachers
     - Expected Behavior: For teachers, it needs to be hidden in the navigation header and should redirect to `/tools`.
   - **b.** Tools that are disabled for certain teachers are still showing for those teachers.
     - Expected Behavior: A teacher should see all tools unless they explicitly have a row in `teacher_tools` with `disabled = true`.

### Software Engineer

1. Fix the following defects:
   - **a.** The admin page is showing for teachers
     - Expected Behavior: For teachers, it needs to be hidden in the navigation header and should redirect to `/tools`.
   - **b.** Tools that are disabled for certain teachers are still showing for those teachers.
     - Expected Behavior: A teacher should see all tools unless they explicitly have a row in `teacher_tools` with `disabled = true`.
2. Complete the following task:
   - **a.** Teacher Editing

     Requirements:
     1. Admins can edit a teacher in Teacher Management (i.e. name, active).
     2. Edits can be saved and are committed to the database.

### Senior+ Software Engineer

1. Fix the following defects:
   - **a.** The admin page is showing for teachers
     - Expected Behavior: For teachers, it needs to be hidden in the navigation header and should redirect to `/tools`.
   - **b.** Tools that are disabled for certain teachers are still showing for those teachers.
     - Expected Behavior: A teacher should see all tools unless they explicitly have a row in `teacher_tools` with `disabled = true`.
2. Complete the following task:
   - **a.** Add support for "Grade Level" (ie: pre-K, K, 1, 2, ...12)

     Requirements:
     1. Admins are able to assign a Grade Level to a tool.
     2. Teachers can filter tools by Grade Level on the /tools page.
     3. Admins are able to assign Grade Levels to teachers.
