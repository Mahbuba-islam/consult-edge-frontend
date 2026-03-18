import { getUsersAction } from "@/src/app/actions/user.action";
import { User } from "@/src/types/user.types";
import Image from "next/image";

interface GetUsersResponse {
  users: User[];
}

export default async function AdminUsersPage() {
  const data = (await getUsersAction()) as GetUsersResponse;
  const users = data?.users ?? [];

  return (
    <div className="space-y-8 p-4 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight">All Users</h1>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-left text-gray-600">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Bookings</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {users.map((u: User) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* USER + AVATAR */}
                  <td className="px-4 py-3 flex items-center gap-3">
                    {u.image ? (
                      <Image
                        src={u.image}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <span className="font-medium">{u.name}</span>
                  </td>

                  {/* EMAIL */}
                  <td className="px-4 py-3 text-gray-700">{u.email}</td>

                  {/* ROLE */}
                  <td className="px-4 py-3 capitalize text-gray-700">
                    {u.role.toLowerCase()}
                  </td>

                  {/* BOOKINGS */}
                  <td className="px-4 py-3 text-gray-700">
                    {u._count?.bookings ?? 0}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}