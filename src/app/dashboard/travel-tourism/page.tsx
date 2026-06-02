"use client";

import CrudPage from "../../../components/CrudPage/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Travel Tourism"
      endpoint="/api/travel-tourism"
      fetchDetailOnEdit
      columns={[
        { key: "_id", label: "ID" },
        { key: "clientId", label: "Client ID" },
        { key: "tripType", label: "Trip Type" },
        { key: "leavingFrom", label: "Leaving From" },
        { key: "goingTo", label: "Going To" },
        {
          key: "departingDate",
          label: "Departing Date",
          render: (value) => value ? new Date(value).toLocaleDateString() : "-",
        },
      ]}
      fields={[
        { key: "clientId", label: "Client ID", required: true },
        {
          key: "tripType",
          label: "Trip Type",
          type: "select",
          required: true,
          options: [
            { label: "Multiple Destinations", value: "Multiple Destinations" },
            { label: "Round Trip", value: "Round Trip" },
            { label: "One Way", value: "One Way" },
          ],
        },
        {
          key: "cabinClass",
          label: "Cabin Class",
          type: "select",
          required: true,
          options: [
            { label: "First", value: "First" },
            { label: "Business", value: "Business" },
            { label: "Premium", value: "Premium" },
            { label: "Economy", value: "Economy" },
          ],
        },
        { key: "leavingFrom", label: "Leaving From", required: true },
        { key: "goingTo", label: "Going To", required: true },
        {
          key: "multipleDestinations",
          label: "Multiple Destinations",
          type: "textarea",
          required: (formData) => formData.tripType === "Multiple Destinations",
          placeholder: "Enter destinations separated by commas",
        },
        { key: "departingDate", label: "Departing Date", type: "date", required: true },
        {
          key: "returnDate",
          label: "Return Date",
          type: "date",
          required: (formData) => formData.tripType === "Round Trip",
        },
        { key: "airline", label: "Airline" },
        { key: "stops", label: "Stops", type: "number" },
        { key: "destinationFocus", label: "Destination Focus" },
        { key: "adult", label: "Adult", type: "number" },
        { key: "children", label: "Children", type: "number" },
        { key: "infants", label: "Infants", type: "number" },
        { key: "preferredHotel", label: "Preferred Hotel" },
        { key: "roomType", label: "Room Type" },
        { key: "nights", label: "Nights", type: "number" },
        { key: "checkInDate", label: "Check In Date", type: "date" },
        { key: "checkOutDate", label: "Check Out Date", type: "date" },
        { key: "mealPreference", label: "Meal Preference" },
        { key: "pickupLocation", label: "Pickup Location" },
        { key: "dropoffLocation", label: "Dropoff Location" },
        { key: "pickupDate", label: "Pickup Date", type: "date" },
        { key: "pickupTime", label: "Pickup Time" },
        { key: "carRentalPickupDate", label: "Car Rental Pickup Date", type: "date" },
        { key: "carRentalDropoffDate", label: "Car Rental Dropoff Date", type: "date" },
        { key: "carType", label: "Car Type" },
        { key: "driverAge", label: "Driver Age", type: "number" },
        { key: "specialRequests", label: "Special Requests", type: "textarea" },
      ]}
    />
  );
}
