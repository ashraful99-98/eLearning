import { apiSlice } from "../api/apiSlice";

export const contactApi = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        contactHandler: builder.mutation({
            query: (data)=>({
                url:'contact',
                method: "POST",
                body: JSON.stringify(data),
                // body: {
                //     data,
                // },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include" as const,
            }),
        }),
    }),
});

export const {useContactHandlerMutation} = contactApi;





