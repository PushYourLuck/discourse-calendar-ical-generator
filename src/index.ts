import ical, { ICalCalendarMethod } from 'ical-generator';
export default {
	async fetch(request, env, ctx): Promise<Response> {

		const calendar = ical({ name: 'Underline Center Events Calendar' });
		// A method is required for outlook to display event as an invitation
		calendar.method(ICalCalendarMethod.REQUEST);

		let discourseEventsResponse = await fetch('https://underline.center/discourse-post-event/events.json?include_details=true');

		let discourseEvents = await discourseEventsResponse.json();

		discourseEvents.events.forEach((event) => {
			const startTime = new Date(event.starts_at);
			const endTime = new Date(event.ends_at);
			calendar.createEvent({
				start: startTime,
				end: endTime,
				summary: event.post.topic.title,
				location: 'Underline Center, Indiranagar',
				url: `https://underline.center${event.post.url}`
			});
		})



		let res = new Response(calendar.toString());
		res.headers.set('Content-Type', 'text/calendar; charset=utf-8');
		res.headers.set('Content-Disposition', 'attachment; filename="calendar.ics"');
		return res;
	},
} satisfies ExportedHandler<Env>;
