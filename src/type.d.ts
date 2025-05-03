export interface DiscourseEvent {
  can_act_on_discourse_post_event: boolean
  can_update_attendance: boolean
  category_id: number
  creator: Creator
  custom_fields: CustomFields
  ends_at: string
  id: number
  is_closed: boolean
  is_expired: boolean
  is_ongoing: boolean
  is_private: boolean
  is_public: boolean
  is_standalone: boolean
  minimal?: boolean
  name?: string
  post: Post
  raw_invitees: any[]
  recurrence?: string
  recurrence_rule?: string
  reminders: any[]
  sample_invitees: any[]
  should_display_invitees: boolean
  starts_at: string
  stats: Stats
  status: string
  timezone: string
  url: string
  watching_invitee: any
}

export interface Creator {
  id: number
  username: string
  name: string
  avatar_template: string
}

export interface CustomFields {}

export interface Post {
  id: number
  post_number: number
  url: string
  topic: Topic
}

export interface Topic {
  id: number
  title: string
}

export interface Stats {
  going: number
  interested: number
  not_going: number
  invited: number
}
