// "use client";
// import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { Button } from "../ui/button";
// import AddUser from "./AddUser";
// import { DeleteIcon, Edit2 } from "lucide-react";

// export type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// const AllData = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);

//   const { data, isLoading, isError, error } = useQuery<User[]>({
//     queryKey: ["users"],
//     queryFn: () =>
//       fetch(`https://jsonplaceholder.typicode.com/users`).then((res) =>
//         res.json()
//       ),
//   });

//   const handleEdit = (user: User) => {
//     setSelectedUser(user);
//     setIsOpen(true);
//   };

//   return (
//     <div className="p-6">
//       <div className="w-full flex items-center justify-center mt-5">
//         <Button
//           onClick={() => {
//             setSelectedUser(null);
//             setIsOpen(true);
//           }}
//         >
//           Add User
//         </Button>
//       </div>

//       {/* Add/Edit User Modal */}
//       {isOpen && (
//         <AddUser
//           open={isOpen}
//           onOpenChange={setIsOpen}
//           initialData={selectedUser}
//         />
//       )}

//       {/* Display Users */}
//       <div className="p-6">
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : isError ? (
//           <div>Error: {error?.message ?? "Something went wrong"}</div>
//         ) : data?.length === 0 ? (
//           <div>No users found.</div>
//         ) : (
//           data?.map((user) => (
//             <div
//               key={user.id}
//               className="flex items-center justify-between border-2 py-2 px-5 rounded-lg bg-black/80 mb-2"
//             >
//               <div>
//                 <h3 className="text-2xl font-bold text-white leading-normal">
//                   {user.name}
//                 </h3>
//                 <p className="text-xl font-bold text-white leading-normal">
//                   {user.email}
//                 </p>
//               </div>
//               <div className="flex items-center gap-5">
//                 <Edit2
//                   className="cursor-pointer w-[30px] h-[30px] text-white"
//                   onClick={() => handleEdit(user)}
//                 />
//                 <DeleteIcon className="cursor-pointer w-[30px] h-[30px] text-white" />
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllData;



"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "../ui/button";
import AddUser from "./AddUser";
import { DeleteIcon, Edit2 } from "lucide-react";

// User Type Definition
export type User = {
  id: number;
  name: string;
  email: string;
};

const AllData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch Users with React Query
  const { data, isLoading, isError, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`
      );
      return response.json();
    },
  });

  // Open Modal for Editing
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <div className="p-6">
      {/* Add User Button */}
      <div className="w-full flex items-center justify-center mt-5">
        <Button
          onClick={() => {
            setSelectedUser(null);
            setIsOpen(true);
          }}
        >
          Add User
        </Button>
      </div>

      {/* Add/Edit User Modal */}
      {isOpen && (
        <AddUser
          open={isOpen}
          onOpenChange={setIsOpen}
          initialData={selectedUser}
        />
      )}

      {/* Display Users */}
      <div className="p-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error?.message ?? "Something went wrong"}</div>
        ) : data?.length === 0 ? (
          <div>No users found.</div>
        ) : (
          data?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border-2 py-2 px-5 rounded-lg bg-black/80 mb-2"
            >
              <div>
                <h3 className="text-2xl font-bold text-white leading-normal">
                  {user.name}
                </h3>
                <p className="text-xl font-bold text-white leading-normal">
                  {user.email}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <Edit2
                  className="cursor-pointer w-[30px] h-[30px] text-white"
                  onClick={() => handleEdit(user)}
                />
                <DeleteIcon className="cursor-pointer w-[30px] h-[30px] text-white" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllData;
