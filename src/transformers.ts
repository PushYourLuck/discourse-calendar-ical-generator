import { ICalEventData } from "ical-generator";
import { DiscourseEvent } from "./type";


export function transformDiscourseEventToPublicICalEvent(
    event: DiscourseEvent,
): ICalEventData {
    const startTime = new Date(event.starts_at);
    const endTime = new Date(event.ends_at);

    const ticketsLink = event.url && event.url != 'tba' ? `Tickets available at ${event.url}` : `Tickets coming soon`;
    const description = `Details: https://underline.center${event.post.url}

${ticketsLink}`;

    return {
        id: event.id,
        start: startTime,
        end: endTime,
        summary: event.post.topic.title,
        description: description,
        repeating: event.recurrence_rule,
        location: 'Underline Center, Indiranagar',
        url: `https://underline.center${event.post.url}`,
    }
}