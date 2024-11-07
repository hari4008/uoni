<template>
<!-- contact section start -->
<div class="contact_section layout_padding">
    <div class="container">
        <h1 class="watchs_taital">05<br>Get In Touch</h1>
    </div>
    <div class="contact_section_2">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-5">
                    <div class="mail_section_1">
                        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{errors,values}" :initial-values="initialValues">
                            <Field class="mail_text" name="name" type="text" placeholder="Enter Name" />
                            <div class="err_msg">{{ errors.name }}</div>

                            <Field class="mail_text" name="mobileNumber" type="tel" placeholder="Enter Mobile Number" />
                            <div class="err_msg">{{ errors.mobileNumber }}</div>

                            <Field class="mail_text" name="email" type="email" placeholder="Enter Email" />
                            <div class="err_msg">{{ errors.email }}</div>

                            <Field as="textarea" class="massage-bt" placeholder="Massage" name="message" rows="5" />
                            <div class="err_msg">{{ errors.message }}</div>

                            <button type="submit">SEND</button>
                        </Form>
                    </div>
                </div>
                <div class="col-md-7 padding_right_0">
                    <div class="map_section"><img src="../assets/images/map-img.png"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- contact section end -->
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

export default {
    name: 'ContactUs',
    components: {
        Form,
        Field,
    },
    setup() {
        const store = useUserStore();
        const schema = yup.object({
            name: yup.string().required('Name is required'),
            mobileNumber: yup.string().required('Mobile Number is required').min(10, 'Mobile number must be at least 10 digits'),
            email: yup.string().required('Email is required').email('Invalid email address'),
            message: yup.string().required('Comment is required').min(2, 'Comment must be at least 2 characters long')
        });

        const initialValues = {
            name: '',
            mobileNumber: '',
            email: '',
            message: ''
        };

        const onSubmit = (values) => {
            console.log('form submitted');
            console.log(values);
            if (values) {
                const newObj = {
                    name: values.name,
                    mobileNum: values.mobileNumber,
                    email: values.email,
                    message: values.message
                }
                store.addContact(newObj)
            } else {
                console.error('Form validation failed');
            }
        };

        // onMounted(async () => {
        //     try {
        //         const token = sessionStorage.getItem('token');
        //         if (!token) {
        //             router.push({
        //                 name: 'Login'
        //             });
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // });

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
