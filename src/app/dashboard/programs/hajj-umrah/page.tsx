"use client";

import CrudPage from "../../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Hajj & Umrah"
      endpoint="/api/programs/hajj-umrah"
      fetchDetailOnEdit
      columns={[
        { key: "_id", label: "ID" },
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
            { label: "1", value: "1" },
            { label: "2-4", value: "2-4" },
            { label: "5-10", value: "5-10" },
            { label: "11-20", value: "11-20" },
            { label: "20+", value: "20+" },
          ],
        },
        { key: "notes", label: "Notes", type: "textarea", placeholder: "Any special requirements or notes..." },
      ]}
    />
  );
}
