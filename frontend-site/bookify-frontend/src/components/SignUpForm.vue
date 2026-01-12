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
                Email: "Email address",
                Username: "Username",
                FullName: "Your full name",
                DisplayName: "Name that other users see",
                PlainPhoneNumber: "",
                PlainPassword: "Password",
                ProfileImageUrl: "Link to your image",
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
            <label>Username</label>
            <input v-model="NewUser.Username" type="text"/>
        </div>
        <div>
            <label>FullName</label>
            <input v-model="NewUser.FullName" type="text"/>
        </div>
        <div>
            <label>PlainPhoneNumber</label>
            <input v-model="NewUser.PlainPhoneNumber" type="text"/>
        </div>
        <div>
            <label>ProfileImageUrl</label>
            <input v-model="NewUser.ProfileImageUrl" type="text"/>
        </div>
        <button type="submit">Register</button>
    </form>
</template>