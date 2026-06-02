"use client";

import CrudPage from "../../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Explore USA"
      endpoint="/api/programs/explore-usa"
      fetchDetailOnEdit
      columns={[
        { key: "_id", label: "ID" },
        { key: "fullName", label: "Full Name" },
        { key: "emailAddress", label: "Email Address" },
        {
          key: "tripStartDate",
          label: "Trip Start Date",
          render: (value) => value ? new Date(value).toLocaleDateString() : "-",
        },
        { key: "tripType", label: "Trip Type" },
        { key: "numberOfTravelers", label: "Travelers" },
      ]}
      fields={[
        { key: "fullName", label: "Full Name", placeholder: "Enter your full name" },
        { key: "emailAddress", label: "Email Address", placeholder: "Enter your email" },
        { key: "phoneNumber", label: "Phone Number", placeholder: "+1 " },
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
            { label: "Boston", value: "Boston" },
            { label: "San Francisco", value: "San Francisco" },
            { label: "Las Vegas", value: "Las Vegas" },
            { label: "Hawaii", value: "Hawaii" },
            { label: "Houston, Texas", value: "Houston, Texas" },
            { label: "Miami Beaches", value: "Miami Beaches" },
            { label: "Grand Canyon", value: "Grand Canyon" },
            { label: "Walt Disney World", value: "Walt Disney World" },
            { label: "Yosemite National Park", value: "Yosemite National Park" },
            { label: "White House", value: "White House" },
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
        {
          key: "notesSpecialRequests",
          label: "Notes & Special Requests",
          type: "textarea",
          placeholder: "Please mention any special requirements or notes",
        },
        {
          key: "needAccommodation",
          label: "Need an Accommodation?",
          type: "select",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
      ]}
    />
  );
}
