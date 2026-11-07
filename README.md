FeastPeak — Modern Event Discovery & Registration Platform :

📌 Project Overview

FeastPeak is an end-to-end, responsive event discovery and registration web application engineered for campus and tech communities. It provides a seamless interface to explore upcoming hackathons, technical conferences, festivals, and workshops, view comprehensive schedules and venue details, filter by track, and register with client-side form validation and state persistence.

Built as an academic end-semester project with a focus on core web technologies (HTML5, modern CSS3 with custom variables, and modular Vanilla JavaScript), FeastPeak follows responsive UI/UX principles, accessibility standards, and clean component structures without relying on heavy external dependencies.

Live Links & Submission Details :

🚀 Live Deployment: FeastPeak Web Application (https://inquisitive-souffle-fb1610.netlify.app)

Source Repository: github.com/dotSHUBHAM101/FeastPeak

Author: Shubham Mishra

Course/Semester: B.Tech (Computer Science & Engineering), 5th Semester

🌟 Key Features : 

1. Dynamic Discovery & Hero Section
Hero Banner: Visual branding with immediate calls-to-action ("Explore Events", "Register Now") and a quick-stats summary counter.

Featured Events Carousel/Grid: High-priority events displayed using custom badge indicators (Featured, Registration Closing Soon).

2. Search, Filter & Live Navigation
Instant Text Search: Real-time event name and keyword matching as the user types, debounced for efficiency.

Category Filtering: Dynamic categorization chips (e.g., All, Hackathon, Coding, Workshop, Cultural).

Active State Toggles: Clear UI cues indicating currently active filters with a zero-state fallback ("No events found matching your criteria").

3. Detailed Event Modals & Real-Time Countdown
Event Detail Views: Accessible modals surfacing rich descriptions, organizer coordinates, time zones, venues, and ticket prerequisites.

Live Countdown Timer: JavaScript tick timers tracking remaining days, hours, minutes, and seconds until event commencement.

4. Robust Registration Engine & Client-Side Validation
Validated Form Fields:

Full Name (minimum character constraints, alphabetic verification).

Institutional / Personal Email (strict RFC-standard regex checking).

10-Digit Mobile Number (numeric boundary validation).

Dynamic Event Selector (pre-selects the active event from modal triggers).

Instant Feedback & UX Alerts: Visual boundary styling on invalid inputs, helpful inline error messaging, and animated confirmation dialogs on successful dispatch.

Duplicate Submission Guard: Checks client storage to prevent registering twice for the same event with the same email.

5. Bonus Implementations
Dark / Light Mode: Custom CSS token switching powered by data attributes (data-theme="dark" / data-theme="light") and saved across sessions via localStorage.

State Persistence (Local Storage): All successfully confirmed registrations are stored locally, simulating backend storage and surviving browser reloads.

Interactive Micro-Animations: CSS transitions on card elevation, smooth modal fade/slide actions, and hover states.

📱 Responsive Breakpoints & Device Adaptation : 

<img width="628" height="332" alt="image" src="https://github.com/user-attachments/assets/b6b9095d-c108-43c6-861e-db9b551616ce" />

<img width="116" height="269" alt="image" src="https://github.com/user-attachments/assets/589bcc9d-0f69-45f3-80e3-a3c2eb6ea136" />




