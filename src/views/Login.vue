<template>
<!-- Login section start -->
<div class="contact_section layout_padding">
    <div class="container">
        <h1 class="watchs_taital">07<br>Login</h1>
    </div>
    <div class="contact_section_2">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-5">
                    <div class="mail_section_1" style="margin-top: 7rem;">
                        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="initialValues" v-slot="{ errors, values }">
                            <Field name="email" as="input" type="email" placeholder="Enter Email" class="mail_text" />
                            <div class="err_msg">{{ errors.email }}</div>

                            <Field name="password" as="input" type="password" placeholder="Enter Password" class="mail_text" />
                            <div class="err_msg">{{ errors.password }}</div>

                            <button type="submit">Login</button>
                        </Form>
                    </div>
                </div>
                <div class="col-md-7 padding_right_0">
                    <div class="map_section"><img src="../assets/images/map-img.png" alt="Map" /></div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Login section end -->
</template>

<script>
import {
    Form,
    Field
} from 'vee-validate';
import {
    useUserStore
} from '@/stores/users';
import * as yup from 'yup';
import router from '@/router';
import Swal from 'sweetalert2';

export default {
    name: 'Login',
    components: {
        Form,
        Field
    },
    setup() {
        const store = useUserStore();
        const schema = yup.object({
            email: yup.string()
                .required('Email is required')
                .email('Invalid email address')
                .min(2, 'Email is too short')
                .max(50, 'Email is too long'),
            password: yup.string()
                .required('Password is required')
                .min(4, 'Password must be at least 4 characters long')
                .matches(/[0-9]/, 'Password requires a number')
                .matches(/[a-z]/, 'Password requires a lowercase letter')
                .matches(/[A-Z]/, 'Password requires an uppercase letter')
                .matches(/[^\w]/, 'Password requires a symbol'),
        });

        const initialValues = {
            email: '',
            password: ''
        };

        const onSubmit = (values) => {
            // console.log('Form submitted');
            console.log(values);
            if (values) {
                const newObj = {
                    email: values.email,
                    password: values.password
                }
                console.log("newObj in login", newObj)
                store.loginUser(newObj).then((res) => {
                    if (res.status === true) {
                        console.log("Login res3", res.token.split(" ")[1]);
                        localStorage.setItem("token",res.token);
                        Swal.fire({
                            title: `${res.message.slice(0,15)} <br/> ${res.message.slice(15,25)} <br/> ${res.message.slice(25)}`,
                            text: "You clicked the button!",
                            icon: "success"
                        });
                        router.push({
                            name: 'Home'
                        });
                    } else {
                        Swal.fire({
                            title: `Error: ${res.message}`,
                            text: "You clicked the button!",
                            icon: "error"
                        });
                    }
                    console.log("Login res1", res.message.slice(0,15));
                    console.log("Login res2", res.token);
                    console.log("Login res4", res.role);
                    console.log("Login res5", res.status);
                    // Access the message and status from the response object
                    // console.log("Message:", res.message);
                    // console.log("Status:", res.status);
                    // if (res.status === 1) {
                    //     Swal.fire({
                    //         title: `Login Successfully! ${res.message}`,
                    //         text: "You clicked the button!",
                    //         icon: "success"
                    //     });
                    //     router.push({
                    //         name: 'Login'
                    //     });
                    // } else {
                    //     if (res.status === 0) {
                    //         Swal.fire({
                    //             title: `Error: ${res.message}`,
                    //             text: "You clicked the button!",
                    //             icon: "error"
                    //         });
                    //     }
                    // }
                }).catch((err) => {
                    console.log("Error:", err);
                });
            } else {
                console.error("Your Account is don't crete. So try again !!!");
            }
        };

        return {
            schema,
            initialValues,
            onSubmit
        };
    }
}
</script>

<style lang="css" scoped>
button {
    width: 30%;
    float: left;
    background-color: #a40514;
    color: #e1e7d8;
    text-align: center;
    padding: 15px 0;
    font-size: 16px;
    border-radius: 40px;
    font-weight: bold;
    margin-top: 2rem;
    border: none;
    cursor: pointer;
}

.err_msg {
    color: red;
}
</style>
