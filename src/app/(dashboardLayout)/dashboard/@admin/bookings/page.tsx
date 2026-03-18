export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


import { getBookingsAction } from "@/src/app/actions/booking.action";
import { Booking } from "@/src/types/booking.types";

export default async function AdminBookingsPage() {
  const res = (await getBookingsAction()) as Booking[];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-2xl font-bold">All Bookings</h1>

      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Student</th>
              <th className="px-4 py-2 text-left">Tutor</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {res.map((b: Booking) => (
              <tr key={b.id} className="border-t">
                <td className="px-4 py-2">
                  {b.student?.name ?? "N/A"}
                </td>

                <td className="px-4 py-2">
                  {b.tutor?.user?.name ?? "N/A"}
                </td>

                <td className="px-4 py-2">
                  {new Date(b.date).toLocaleString()}
                </td>

                <td className="px-4 py-2 capitalize">
                  {b.status?.toLowerCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}