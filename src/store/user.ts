import { defineStore } from "pinia"

export const useUserStore = defineStore('user',{
    state:()=>({
        user: {
            _id: 'Anonymous'
        } as { _id: string },
    }),
    actions:{
        resetUser() {
            this.user = { _id: '' }
        },
    }
})