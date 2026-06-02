"use client";

import CrudPage from "../../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Explore Kingdom"
      endpoint="/api/programs/explore-kingdom"
      fetchDetailOnEdit
      allowCreate={false}
      columns={[
        { key: "_id", label: "ID" },
        { key: "fullName", label: "Full Name" },
        { key: "emailAddress", label: "Email Address" },
        {
          key: "tripStartDate",
          label: "Trip Start Date",
          render: (value) => value ? new Date(value).toLocaleDateString() : "-",
        },
        {
          key: "tripEndDate",
          label: "Trip End Date",
          render: (value) => value ? new Date(value).toLocaleDateString() : "-",
        },
        { key: "numberOfTravelers", label: "Number of Travelers" },
        { key: "tripType", label: "Trip Type" },
        { key: "preferredGuidingLanguage", label: "Guiding Language" },
      ]}
      fields={[
        { key: "fullName", label: "Full Name", placeholder: "Enter your full name" },
        { key: "emailAddress", label: "Email Address", placeholder: "Enter your email" },
        { key: "phoneNumber", label: "Phone Number", placeholder: "Enter your phone number" },
        {
          key: "preferredContactMethod",
          label: "Preferred Contact Method",
          type: "select",
          options: [
            { label: "Email", value: "Email" },
            { label: "Phone Number", value: "Phone Number" },
            { label: "Whatsapp", value: "Whatsapp" },
          ],
        },
        { key: "tripStartDate", label: "Trip Start Date", type: "date", placeholder: "mm/dd/yyyy" },
        { key: "tripEndDate", label: "Trip End Date", type: "date", placeholder: "mm/dd/yyyy" },
        { key: "numberOfTravelers", label: "Number of Travelers", type: "number", placeholder: "Type here" },
        {
          key: "tripType",
          label: "Trip Type",
          type: "select",
          options: [
            { label: "One Way", value: "One Way" },
            { label: "Round Trip", value: "Round Trip" },
            { label: "Hourly", value: "Hourly" },
          ],
        },
        {
          key: "preferredDestinations",
          label: "Preferred Destinations",
          type: "checkbox-group",
          options: [
            { label: "Al Souda", value: "Al Souda" },
            { label: "Ragal Almaa", value: "Ragal Almaa" },
            { label: "AlUla", value: "AlUla" },
            { label: "Mecca", value: "Mecca" },
            { label: "Diriyah", value: "Diriyah" },
            { label: "Medina", value: "Medina" },
            { label: "Other (Please specify)", value: "Other (Please specify)" },
          ],
        },
        { key: "otherDestination", label: "Other Destination", placeholder: "Please specify other destination" },
        {
          key: "preferredGuidingLanguage",
          label: "Preferred Guiding Language",
          type: "select",
          placeholder: "Select language",
          options: [
            { label: "Arabic", value: "Arabic" },
            { label: "English", value: "English" },
            { label: "French", value: "French" },
            { label: "Spanish", value: "Spanish" },
            { label: "Urdu", value: "Urdu" },
          ],
        },
        { key: "budgetRange", label: "Budget Range", placeholder: "Type here" },
        {
          key: "domesticFlightsNeeded",
          label: "Do You Need Help With Domestic Flights?",
          type: "select",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        {
          key: "hotelAccommodationNeeded",
          label: "Do You Need Help With Hotel/Accommodation?",
          type: "select",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        { key: "notesAndSpecialRequests", label: "Notes & Special Requests", type: "textarea" },
      ]}
    />
  );
}
