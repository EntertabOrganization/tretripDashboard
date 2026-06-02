"use client";

import CrudPage from "../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Contact Us"
      endpoint="/api/contact-us"
      fetchDetailOnEdit
      allowCreate={false}
      columns={[
        { key: "_id", label: "ID" },
        { key: "fullName", label: "Full Name" },
        { key: "emailAddress", label: "Email Address" },
        { key: "phoneNumber", label: "Phone Number" },
        { key: "serviceType", label: "Service Type" },
        {
          key: "createdAt",
          label: "Created At",
          render: (value) => value ? new Date(value).toLocaleDateString() : "-",
        },
      ]}
      fields={[
        { key: "fullName", label: "Full Name", placeholder: "Enter full name" },
        { key: "emailAddress", label: "Email Address", placeholder: "Enter email address" },
        { key: "phoneNumber", label: "Phone Number", placeholder: "Enter phone number" },
        {
          key: "serviceType",
          label: "Service Type",
          type: "select",
          options: [
            { label: "Travel Tourism", value: "Travel Tourism" },
            { label: "Medical Tourism", value: "Medical Tourism" },
            { label: "Transportation Services", value: "Transportation Services" },
            { label: "Shipping Services", value: "Shipping Services" },
            { label: "Business Services", value: "Business Services" },
            { label: "Events", value: "Events" },
            { label: "Hajj & Umrah", value: "Hajj & Umrah" },
            { label: "Explore Kingdom", value: "Explore Kingdom" },
            { label: "Explore USA", value: "Explore USA" },
          ],
        },
        { key: "message", label: "Message", type: "textarea", placeholder: "Enter message" },
      ]}
    />
  );
}
