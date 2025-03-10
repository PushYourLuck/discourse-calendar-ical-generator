import ical, { ICalCalendarMethod } from 'ical-generator';
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/':
				const html = `<!DOCTYPE html>
    				<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				</head>
				<body>
				<h2>Underline Center Calendar</h2>
				<a href="https://www.google.com/calendar/render?cid=64jp4d84mrqgphnpq7qkiq3c0jg9sapd%40import.calendar.google.com"><button>Subscribe via Google Calendar</button></a>
				<p>If the link doesn't work automatically, you manually import the below the URL into your calendar app.<pre>https://feed.underline.center/calendar.ics</pre></p>
				</body>`;

				return new Response(html, {
					headers: {
						'content-type': 'text/html;charset=UTF-8',
					},
				});

			case '/calendar.ics':
				const calendar = ical({
					name: 'Underline Center Events Calendar',
					description: 'All the upcoming events at Underline Center - a community center for thoughtful, kind, and interesting events.',
				});

				// A method is required for outlook to display event as an invitation
				calendar.method(ICalCalendarMethod.REQUEST);

				// Sets the timezone on the calendar to UTC (since that's we get from the API)
				calendar.timezone('UTC');

				// Let's the client know where to calendar source is from
				calendar.source('https://feed.underline.center/calendar.ics');

				// Set refresh-interval (not all clients will honor this, so it's best-effort)
				calendar.ttl(60 * 60 * 6); // 6 hours

				let discourseEventsResponse = await fetch('https://underline.center/discourse-post-event/events.json?include_details=true');

				let discourseEvents: { events: any[] } = await discourseEventsResponse.json();

				discourseEvents.events.forEach((event) => {
					const startTime = new Date(event.starts_at);
					const endTime = new Date(event.ends_at);

					const ticketsLink = event.url ? `Tickets available at ${event.url}` : `Tickets coming soon'`;
					const description = `Details: https://underline.center${event.post.url}

${ticketsLink}`;
					calendar.createEvent({
						start: startTime,
						end: endTime,
						summary: event.post.topic.title,
						description: description,
						location: 'Underline Center, Indiranagar',
						url: `https://underline.center${event.post.url}`,
					});
				});

				let res = new Response(calendar.toString());
				res.headers.set('Content-Type', 'text/calendar; charset=utf-8');
				res.headers.set('Content-Disposition', 'attachment; filename="calendar.ics"');

				return res;
			default:
				return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;
