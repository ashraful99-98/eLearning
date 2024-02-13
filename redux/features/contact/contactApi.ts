// import { apiSlice } from "../api/apiSlice";

// export const contactApi = apiSlice.injectEndpoints({
//     endpoints: (builder)=>({
//         contactHandler: builder.mutation({
//             query: (data)=>({
//                 url:'contact',
//                 method: "POST",
//                 body: JSON.stringify(data),
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 },
//                 credentials: "include" as const,
//             }),
//             async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//                 try {
//                     .then((res)=>{
//                         if(!res.ok) throw new Error("Failed to send message");
//                         return res.json();
//                     }),
//                   );
//                 } catch (error: any) {
//                   console.log(error);
//                 }
//               },
//         }),
//     }),
// });

// export const {useContactHandlerMutation} = contactApi;


import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        contactHandler: builder.mutation({
            query: (data) => ({
                url: 'contact',
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    if (!response) {
                        throw new Error("Failed to send message");
                    }
                } catch (error: any) {
                    console.log(error);
                    throw error; // Rethrow the error to be caught by the error handler
                }
            },
        }),
    }),
});

export const { useContactHandlerMutation } = contactApi;
