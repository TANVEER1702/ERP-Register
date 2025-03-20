"use client";
import { useEffect, useState } from "react";
import { Button } from "../buttons";

interface User {
  column_name: string;
  table_name: string;
  column_type: string;
  interface_type: string;
  ordering_number: number;
  createdAt: string;
}
const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          "https://erp-backend-kunxite.vercel.app/api/structure-table/screen/signup"
        );
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setUsers(data.data); 
        } else {
          setError("Invalid API response format");
        }
        
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleDelete(column_name: string) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/users/${column_name}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((items) => items.column_name !== column_name));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error deleting user");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((items) => (
              <tr key={items.column_name} className="text-center">
                <td className="p-2 border">{items.table_name}</td>
                <td className="p-2 border">{items.column_name}</td>
                <td className="p-2 border">{items.column_type}</td>
                <td className="p-2 border">{items.interface_type}</td>
                <td className="p-2 border">
                  <Button
                    label="Delet"
                    variant="danger"
                    size="small"
                    onClick={() => handleDelete(items.column_name)}                  
                  />                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
