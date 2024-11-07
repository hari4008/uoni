<template>
<!-- register section start -->
<div class="contact_section layout_padding">
    <div class="container">
        <h1 class="watchs_taital">06<br>Register</h1>
    </div>
    <div class="contact_section_2">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-5">
                    <div class="mail_section_1">
                        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="initialValues" v-slot="{ errors, values }">
                            <Field name="name" as="input" type="text" placeholder="Enter Name" class="mail_text" />
                            <div class="err_msg">{{ errors.name }}</div>

                            <Field name="mobileNumber" as="input" type="tel" placeholder="Enter Mobile Number" class="mail_text" />
                            <div class="err_msg">{{ errors.mobileNumber }}</div>

                            <Field name="email" as="input" type="email" placeholder="Enter Email" class="mail_text" />
                            <div class="err_msg">{{ errors.email }}</div>

                            <Field name="password" as="input" type="password" placeholder="Enter Password" class="mail_text" />
                            <div class="err_msg">{{ errors.password }}</div>

                            <Field name="cpassword" as="input" type="password" placeholder="Confirm Password" class="mail_text" />
                            <div class="err_msg">{{ errors.cpassword }}</div>

                            <!-- Comment field (optional) -->
                            <!-- <Field as="textarea" name="comment" class="massage-bt" rows="5" placeholder="Message" :class="{'is-invalid': errors.comment}" />
                            <div class="err_msg">{{ errors.comment }}</div> -->

                            <button type="submit">Register</button>
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
<!-- register section end -->
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
import Swal from 'sweetalert2'
import router from '@/router';

export default {
    name: 'Register',
    components: {
        Form,
        Field
    },
    setup() {
        const store = useUserStore();
        const schema = yup.object({
            name: yup.string()
                .required('Name is required')
                .min(2, 'Name is too short'),
            mobileNumber: yup.string()
                .required('Mobile Number is required')
                .min(10, 'Mobile number must be at least 10 digits'),
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
            cpassword: yup.string()
                .required('Confirm Password is required')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
        });

        const initialValues = {
            name: '',
            mobileNumber: '',
            email: '',
            password: '',
            cpassword: ''
        };

        const onSubmit = (values) => {
            // console.log('Form submitted');
            console.log(values);
            if (values) {
                const newObj = {
                    name: values.name,
                    email: values.email,
                    phone: values.mobileNumber,
                    password: values.password
                }
                console.log("newObj", newObj)
                store.signupUser(newObj).then((res) => {
                    console.log("Register res", res);
                    // Access the message and status from the response object
                    // console.log("Message:", res.message);
                    // console.log("Status:", res.status);
                    if (res.status === 1) {
                        Swal.fire({
                            title: `Account Created Successfully! ${res.message}`,
                            text: "You clicked the button!",
                            icon: "success"
                        });
                        router.push({
                            name: 'Login'
                        });
                    } else {
                        if (res.status === 0) {
                            Swal.fire({
                                title: `Error: ${res.message}`,
                                text: "You clicked the button!",
                                icon: "error"
                            });
                        }
                    }
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
