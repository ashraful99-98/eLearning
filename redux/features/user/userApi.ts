import { apiSlice } from "../api/apiSlice";


export const userApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        updateAvatar: builder.mutation({
            query:(avatar)=>({
                url:"update-user-avatar",
                method:"PUT",
                body:{avatar},
                credentials: "include" as const,
            })
        }),
        editProfile: builder.mutation({
            query:({name})=>({
                url:"update-user-info",
                method:"PUT",
                body:{name},
                credentials: "include" as const,
            }),
        }),
        updatePassword: builder.mutation({
            query:({oldpassword,newPassword})=>({
                url:"update-user-password",
                method:"PUT",
                body:{
                    oldpassword,
                    newPassword
                },
                credentials: "include" as const,
            }),
        }),
        getAllUsers : builder.query({
            query:()=>({
                url: "get-all-users",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        deleteUser : builder.mutation({
            query:(id)=>({
                url: `delete-user/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
    }),
});

export const {useUpdateAvatarMutation,useEditProfileMutation, useUpdatePasswordMutation, useGetAllUsersQuery,useDeleteUserMutation} = userApi; 