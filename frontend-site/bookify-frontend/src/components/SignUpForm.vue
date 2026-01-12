<script>
    export default {
        methods: {
            async signUp() {
                await(
                    await fetch(`http://localhost:8080/users/`, 
                    {
                        method: 'POST', 
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify(this.NewUser)
                    })
                )
            }
        },
        name: "SignUpForm",
        data() {
            return {NewUser: {
                Email: "",
                UserName: "",
                FullName: "",
                DisplayName: "",
                PhoneNumber: "",
                PlainPassword: "",
                ProfileImageUrl: "",
                PagesReadTotal: 0,
                BooksReadCount: 0  
            }}
        }
    }
</script>

<template>
    <h1>Enter your data:</h1>
    <form @submit.prevent="signUp">
        <div>
            <label>Email</label>
            <input v-model="NewUser.Email" type="text"/>
        </div>        
        <div>
            <label>PlainPassword</label>
            <input v-model="NewUser.PlainPassword" type="text"/>
        </div>
        <div>
            <label>UserName</label>
            <input v-model="NewUser.UserName" type="text"/>
        </div>
        <div>
            <label>FullName</label>
            <input v-model="NewUser.FullName" type="text"/>
        </div>
        <div>
            <label>DisplayName</label>
            <input v-model="NewUser.DisplayName" type="text"/>
        </div>
        <div>
            <label>PhoneNumber</label>
            <input v-model="NewUser.PhoneNumber" type="text"/>
        </div>
        <div>
            <label>ProfileImageUrl</label>
            <input v-model="NewUser.ProfileImageUrl" type="text"/>
        </div>
        <button type="submit">Register</button>
    </form>
</template>