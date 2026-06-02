"use client";

import CrudPage from "../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Business Services"
      endpoint="/api/business-services"
      fetchDetailOnEdit
      columns={[
        { key: "_id", label: "ID" },
        { key: "passportNumber", label: "Passport Number" },
        { key: "gender", label: "Gender" },
        { key: "countryOfDeparture", label: "Country of Departure" },
        { key: "destinationCountryCity", label: "Destination Country / City" },
        {
          key: "preferredDepartureDate",
          label: "Preferred Departure Date",
          render: (value) => value ? new Date(value).toLocaleDateString() : "-",
        },
      ]}
      fields={[
        { key: "dateOfBirth", label: "Date of Birth", type: "date", placeholder: "mm/dd/yyyy" },
        { key: "passportNumber", label: "Passport Number", placeholder: "Enter your passport number" },
        {
          key: "gender",
          label: "Gender",
          type: "select",
          options: [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ],
        },
        {
          key: "countryOfDeparture",
          label: "Country of Departure",
          placeholder: "Select Country",
        },
        {
          key: "destinationCountryCity",
          label: "Destination Country / City",
          placeholder: "Select Destination",
        },
        { key: "jobTitle", label: "Job Title", placeholder: "Enter your job title" },
        { key: "companyName", label: "Company Name", placeholder: "Enter your company name" },
        { key: "companyIndustry", label: "Company Industry", placeholder: "Enter your company industry" },
        { key: "preferredDepartureDate", label: "Preferred Departure Date", type: "date", placeholder: "mm/dd/yyyy" },
        { key: "preferredReturnDate", label: "Preferred Return Date", type: "date", placeholder: "mm/dd/yyyy" },
        {
          key: "travelAlone",
          label: "Will You Travel Alone?",
          type: "select",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
        },
        {
          key: "specialInstructions",
          label: "Special Instructions",
          type: "textarea",
          placeholder: "Please provide any special instructions for your business event",
        },
        {
          key: "requiredSupportServices",
          label: "Required Support Services",
          type: "checkbox-group",
          options: [
            { label: "Venue Booking", value: "Venue Booking" },
            { label: "A/V Setup", value: "A/V Setup" },
            { label: "Branding & Printing", value: "Branding & Printing" },
            { label: "Decoration", value: "Decoration" },
            { label: "Catering", value: "Catering" },
            { label: "Stage Design", value: "Stage Design" },
            { label: "Transportation", value: "Transportation" },
            { label: "Security", value: "Security" },
          ],
        },
        { key: "additionalNotes", label: "Additional Notes", type: "textarea" },
      ]}
    />
  );
}
