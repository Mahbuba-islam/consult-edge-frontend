export default function BookingTable({
  type,
}: {
  type: "tutor" | "student"
}) {
  return (
    <div className="p-4 bg-white shadow rounded">
      <p className="text-gray-500">Booking list for {type}</p>
    </div>
  )
}
