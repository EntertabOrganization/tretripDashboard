"use client";

import CrudPage from "../../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Hajj & Umrah"
      endpoint="/api/programs/hajj-umrah"
      fetchDetailOnEdit
      allowCreate={false}
      columns={[
        { key: "_id", label: "ID" },
        { key: "fullName", label: "Full Name" },
        { key: "emailAddress", label: "Email Address" },
        { key: "passportNumber", label: "Passport Number" },
        {
          key: "pilgrimageDate",
          label: "Pilgrimage Date",
          render: (value) => value ? new Date(value).toLocaleDateString() : "-",
        },
        { key: "accommodationClass", label: "Accommodation Class" },
        { key: "groupSize", label: "Group Size" },
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
        { key: "passportNumber", label: "Passport Number", placeholder: "Enter passport number" },
        { key: "pilgrimageDate", label: "Pilgrimage Date", type: "date", placeholder: "mm/dd/yyyy" },
        {
          key: "accommodationClass",
          label: "Accommodation Class",
          type: "select",
          options: [
            { label: "Economy / Budget Class", value: "Economy / Budget Class" },
            { label: "Standard / 3-Star Class", value: "Standard / 3-Star Class" },
            { label: "Premium / 4-Star Class", value: "Premium / 4-Star Class" },
            { label: "Luxury / 5-Star Class", value: "Luxury / 5-Star Class" },
          ],
        },
        {
          key: "groupSize",
          label: "Group Size",
          type: "select",
          placeholder: "Select group size",
          options: [
            { label: "1 Person", value: "1 Person" },
            { label: "2-4 People", value: "2-4 People" },
            { label: "5-10 People", value: "5-10 People" },
            { label: "11-20 People", value: "11-20 People" },
            { label: "20+ People", value: "20+ People" },
          ],
        },
        { key: "notes", label: "Notes", type: "textarea", placeholder: "Any special requirements or notes..." },
      ]}
    />
  );
}
