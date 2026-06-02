"use client";

import CrudPage from "../../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Explore Kingdom"
      endpoint="/api/programs/explore-kingdom"
      fetchDetailOnEdit
      columns={[
        { key: "_id", label: "ID" },
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
        { key: "contactInfo", label: "Contact Info", type: "textarea" },
        { key: "tripStartDate", label: "Trip Start Date", type: "date", placeholder: "mm/dd/yyyy" },
        { key: "tripEndDate", label: "Trip End Date", type: "date", placeholder: "mm/dd/yyyy" },
        { key: "numberOfTravelers", label: "Number of Travelers", placeholder: "Type here" },
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
        { key: "destinationPreferences", label: "Destination Preferences" },
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
        { key: "programPreferences", label: "Program Preferences" },
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
          key: "helpWithDomesticFlights",
          label: "Do You Need Help With Domestic Flights?",
          type: "select",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        {
          key: "helpWithHotelAccommodation",
          label: "Do You Need Help With Hotel/Accommodation?",
          type: "select",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        { key: "notesSpecialRequests", label: "Notes & Special Requests", type: "textarea" },
      ]}
    />
  );
}
