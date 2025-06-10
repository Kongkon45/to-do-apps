// "use client"
// import { useQuery } from '@tanstack/react-query';
// import React from 'react';

// interface Post {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
//   }
  

// const DemoFetch = () => {
//     const {data : resData, isLoading, isError, error} = useQuery<Post>({
//         queryKey : ["blogs"],
//         queryFn : ()=>
//             fetch(`https://jsonplaceholder.typicode.com/posts`)
//             .then((res)=> res.json())
//     })

//     console.log({resData})
//     let content ;
//     if(isLoading) {
//         content = (
//             <p>Loading ......</p>
//         )
//     }
//     else if(isError){
//         content = (
//             <p>{error?.message}</p>
//         )
//     }
    
//     return (
//         <div>
//             DemoFetch
//             {content}
//         </div>
//     );
// };

// export default DemoFetch;

"use client"
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const DemoFetch = () => {
  const {
    data: resData,
    isLoading,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      return res.json();
    },
  });

  console.log({ resData });

  if (isLoading) {
    return <p>Loading ......</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <div>
      <h2>Demo Fetch</h2>
      <ul>
        {resData?.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DemoFetch;
