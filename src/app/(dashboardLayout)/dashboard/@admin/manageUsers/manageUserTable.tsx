"use client";

import { User } from "@/src/types/user.types";
import ManageUserButtons from "./manageUserButton";

interface ManageUserTableProps {
  data: {
    users: User[];
  };
}

export default function ManageUserTable({ data }: ManageUserTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3 border">Name</th>
          <th className="p-3 border">Email</th>
          <th className="p-3 border">Status</th>
          <th className="p-3 border">Manage User</th>
        </tr>
      </thead>

      <tbody>
        {data.users.map((user: User) => (
          <tr key={user.id} className="border-b">
            <td className="p-3 border">{user.name}</td>
            <td className="p-3 border">{user.email}</td>

            <td className="p-3 border">
              <span
                className={`px-2 py-1 rounded text-white ${
                  user.status === "BANNED" ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {user.status}
              </span>
            </td>

            <td className="p-3 border">
              <ManageUserButtons user={user} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}