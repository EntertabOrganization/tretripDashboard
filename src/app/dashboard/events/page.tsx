"use client";

import CrudPage from "../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Events"
      endpoint="/api/events"
      fetchDetailOnEdit
      columns={[
        { key: "_id", label: "ID" },
        { key: "organization", label: "Organization" },
        { key: "eventName", label: "Event Name" },
        { key: "eventType", label: "Event Type" },
        { key: "city", label: "City" },
        {
          key: "preferredDates",
          label: "Preferred Dates",
          render: (value) => value ? new Date(value).toLocaleDateString() : "-",
        },
      ]}
      fields={[
        { key: "organization", label: "Organization", placeholder: "Enter organization name" },
        { key: "position", label: "Position", placeholder: "Enter your position" },
        { key: "eventName", label: "Event Name", placeholder: "Enter event name" },
        {
          key: "eventType",
          label: "Event Type",
          type: "select",
          placeholder: "Select event type",
          options: [
            { label: "Conference", value: "Conference" },
            { label: "Seminar", value: "Seminar" },
            { label: "Workshop", value: "Workshop" },
            { label: "Exhibition", value: "Exhibition" },
            { label: "Corporate Meeting", value: "Corporate Meeting" },
            { label: "Product Launch", value: "Product Launch" },
            { label: "Networking Event", value: "Networking Event" },
            { label: "Gala / Dinner", value: "Gala / Dinner" },
            { label: "Other", value: "Other" },
          ],
        },
        { key: "theme", label: "Theme (Optional)", placeholder: "Enter event theme" },
        { key: "preferredDates", label: "Preferred Dates", type: "date", placeholder: "mm/dd/yyyy" },
        { key: "duration", label: "Duration", placeholder: "e.g., 4 hours" },
        {
          key: "expectedAttendees",
          label: "Expected Attendees",
          type: "select",
          placeholder: "Select range",
          options: [
            { label: "1-50", value: "1-50" },
            { label: "51-100", value: "51-100" },
            { label: "101-250", value: "101-250" },
            { label: "251-500", value: "251-500" },
            { label: "500+", value: "500+" },
          ],
        },
        { key: "targetAudience", label: "Target Audience" },
        { key: "preferredVenue", label: "Preferred Venue (Optional)", placeholder: "Enter preferred venue name" },
        { key: "city", label: "City", placeholder: "Enter city" },
        { key: "country", label: "Country", placeholder: "Select Country" },
        {
          key: "indoorOutdoorEvent",
          label: "Indoor/Outdoor Event",
          type: "select",
          options: [
            { label: "Indoor", value: "Indoor" },
            { label: "Outdoor", value: "Outdoor" },
            { label: "Both", value: "Both" },
          ],
        },
        {
          key: "venueSuggestionsNeeded",
          label: "Venue Suggestions Needed?",
          type: "select",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        {
          key: "bookingSupportNeeded",
          label: "Booking Support Needed?",
          type: "select",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        {
          key: "coreServices",
          label: "Core Services",
          type: "checkbox-group",
          options: [
            { label: "Venue Booking", value: "Venue Booking" },
            { label: "A/V Setup", value: "A/V Setup" },
            { label: "Catering", value: "Catering" },
            { label: "Stage Design", value: "Stage Design" },
          ],
        },
        {
          key: "additionalServices",
          label: "Additional Services",
          type: "checkbox-group",
          options: [
            { label: "Branding & Printing", value: "Branding & Printing" },
            { label: "Decoration", value: "Decoration" },
            { label: "Entertainment/Speakers", value: "Entertainment/Speakers" },
            { label: "Guest Management", value: "Guest Management" },
            { label: "Transportation", value: "Transportation" },
            { label: "Security", value: "Security" },
            { label: "Photography/Videography", value: "Photography/Videography" },
            { label: "Other (Please Specify)", value: "Other (Please Specify)" },
          ],
        },
        { key: "otherAdditionalService", label: "Other Additional Service", placeholder: "Please specify other service" },
        { key: "estimatedBudget", label: "Estimated Budget", placeholder: "Enter estimated budget ($)" },
        { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
      ]}
    />
  );
}
