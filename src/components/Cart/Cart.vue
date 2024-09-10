<template>
<div class="contact_section layout_padding">
    <div class="container">
        <h1 class="watchs_taital">06<br />Cart</h1>
        <div class="contact_section_2">
            <div class="container-fluid">
                <div class="row">
                    <div class="box-1">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product Image</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody style="color: white;">
                                <tr v-for="item in cartDetails" :key="item.id">
                                    <td>
                                        <img :src="getProductImage(item.id)" alt="ProductImg" style="width: 60px; height: 60px" />
                                    </td>
                                    <td>{{ getProductName(item.id) }}</td>
                                    <td>
                                        <div class="card-input-count">
                                            <button @click="decrement(item.id)" class="increase items-count" type="button">
                                                <i class="bi bi-dash"></i>
                                            </button>
                                            <input type="text" name="qty" class="input-text qty" v-model="item.qnty" readonly />
                                            <button @click="increment(item.id)" class="reduced items-count" type="button">
                                                <i class="bi bi-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>{{ getProductPrice(item.id) }}</td>
                                    <td>{{ getProductPrice(item.id) * item.qnty }}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>
                                        <h3 style="color: white;">Total Quantity :</h3>
                                    </th>
                                    <th>
                                        <h1 style="color: white;">{{ totalQnty }}</h1>
                                    </th>
                                    <th></th>
                                    <th>
                                        <h3 style="color: white;">Total Amount :</h3>
                                    </th>
                                    <th>
                                        <h1 style="color: white;">{{ totalAmount }}</h1>
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class="box-2">
                        <Form @submit="orderNow" :validation-schema="schema" :initial-values="initialValues" v-slot="{ errors }">
                            <Field name="name" as="input" type="text" placeholder="Enter Name" class="mail_text order_text" />
                            <div class="err_msg">{{ errors.name }}</div>

                            <Field name="email" as="input" type="email" placeholder="Enter Email" class="mail_text order_text" />
                            <div class="err_msg">{{ errors.email }}</div>

                            <Field name="mobileNumber" as="input" type="tel" placeholder="Enter Mobile Number" class="mail_text order_text" />
                            <div class="err_msg">{{ errors.mobileNumber }}</div>

                            <div class="card mb-3" v-for="(item2, index) in addressesDetails" :key="index">
                                <div class="card-body">
                                    <h5 class="card-title">
                                        <Field type="radio" name="selectedAddress" v-model="selectedAddress" :value="item2.id" />
                                        Address {{ index + 1 }}
                                    </h5>
                                    <SpeedDial :model="getSpeedDialItems(item2.id)" direction="down" :style="{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000}" />
                                    <p class="card-text" style="margin-bottom:0%">{{ item2.address }}</p>
                                    <p class="card-text" style="margin-bottom:0%">{{ item2.city }}, {{ item2.dist }}</p>
                                    <p class="card-text" style="margin-bottom:0%">{{ item2.state }} - {{ item2.pincode }}</p>
                                </div>
                            </div>
                            <div class="err_msg">{{ errors.selectedAddress }}</div>

                            <Button v-if="addressesDetails.length < 3" label="Add Address" class="order_btn" @click="openDialog('create')" style="width: 45%; margin-top:0%" />
                            <br>
                            <Dialog v-model:visible="visible" modal header="Add Address" :style="{ width: '35rem' }">
                                <div class="flex items-center gap-4 mb-2">
                                    <label for="address" class="font-bold w-24 col-4">Address :</label>
                                    <InputText id="address" class="flex-auto col-7" v-model="varObj.addressValue" />
                                </div>
                                <div class="flex items-center gap-4 mb-2">
                                    <label for="city" class="font-bold w-24 col-4">City :</label>
                                    <InputText id="city" class="flex-auto col-7" v-model="varObj.cityValue" />
                                </div>
                                <div class="flex items-center gap-4 mb-2">
                                    <label for="dist" class="font-bold w-24 col-4">District :</label>
                                    <InputText id="dist" class="flex-auto col-7" v-model="varObj.distValue" />
                                </div>
                                <div class="flex items-center gap-4 mb-2">
                                    <label for="state" class="font-bold w-24 col-4">State :</label>
                                    <InputText id="state" class="flex-auto col-7" v-model="varObj.stateValue" />
                                </div>
                                <div class="flex items-center gap-4 mb-2">
                                    <label for="pincode" class="font-bold w-24 col-4">Pincode :</label>
                                    <InputText id="pincode" class="flex-auto col-7" v-model="varObj.pincodeValue" />
                                </div>
                                <template #footer>
                                    <Button label="Cancel" @click="resetFormAndCloseDialog" />
                                    <Button v-if="formMode === 'update'" label="Update" @click="UpdateAddress" />
                                    <Button v-else label="Create" @click="AddAddress" />
                                </template>
                            </Dialog>

                            <button class="order_btn" type="submit" style="width: 45%; margin-top:10%">Order Now</button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    useUserStore
} from '@/stores/users';
import {
    computed,
    onMounted,
    reactive,
    ref
} from 'vue';
import {
    Form,
    Field
} from 'vee-validate';
import * as yup from 'yup';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import SpeedDial from 'primevue/speeddial';
import router from '@/router';

export default {
    components: {
        Form,
        Field,
        Dialog,
        Button,
        InputText,
        SpeedDial
    },
    setup() {
        const store = useUserStore();
        const cartDetails = ref([]);
        const productDetails = ref({});
        const addressesDetails = ref([]);
        const selectedAddress = ref(null);
        const visible = ref(false);
        const formMode = ref('create');

        const varObj = reactive({
            addressValue: '',
            cityValue: '',
            distValue: '',
            stateValue: '',
            pincodeValue: '',
        });

        // const schema = yup.object({
        //     name: yup.string().required(),
        //     email: yup.string().email().required(),
        //     mobileNumber: yup.string().required(),
        //     selectedAddress: yup.number().required(),
        // });

        const schema = yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Enter a valid email').required('Email is required'),
            mobileNumber: yup
                .string()
                .required('Mobile number is required')
                .matches(/^\d+$/, 'Must be a valid number'),
            selectedAddress: yup
                .number()
                .nullable()
                .required('Please select an address')
                .typeError('Address selection is required'),
        });

        const initialValues = reactive({
            name: '',
            email: '',
            mobileNumber: '',
            selectedAddress: '',
        });

        onMounted(async () => {
            try {
                // window.scrollTo(0, 0)
                const token = localStorage.getItem('token');
                if (!token) {
                    router.push({
                        name: 'Login'
                    });
                } else {
                    await store.fetchProducts();
                    await store.fetchAdresses();
                    getCartDetails();
                    getProductDetails();
                    getAddressesDetails();
                }
            } catch (error) {
                console.error(error);
            }

            // }
        });

        const getCartDetails = async () => {
            cartDetails.value = JSON.parse(sessionStorage.getItem('cart')) || [];
        };

        const getProductDetails = async () => {
            productDetails.value = store.getProducts;
        };

        const getAddressesDetails = async () => {
            addressesDetails.value = store.getAllAdress;
        };

        // const getProductImage = (id) => productDetails.value[id]?.imgURL;
        // const getProductName = (id) => productDetails.value[id]?.name;
        // const getProductPrice = (id) => productDetails.value[id]?.price;
        const getProductName = (id) => productDetails.value[id - 1]?.name || "Unknown Product";
        const getProductImage = (id) => `http://localhost:5001/upload/images/${productDetails.value[id-1]?.image[0]}` || "Unknown Product";
        const getProductPrice = (id) => productDetails.value[id - 1]?.price || 0;

        const totalQnty = computed(() => {
            return cartDetails.value.reduce((total, item) => total + item.qnty, 0);
        });

        const totalAmount = computed(() => {
            return cartDetails.value.reduce((total, item) => total + item.qnty * getProductPrice(item.id), 0);
        });

        const increment = (id) => {
            const product = cartDetails.value.find((item) => item.id === id);
            if (product) product.qnty += 1;
        };

        const decrement = (id) => {
            const product = cartDetails.value.find((item) => item.id === id);
            if (product && product.qnty > 1) {
                product.qnty -= 1;
                sessionStorage.setItem("cart", JSON.stringify(cartDetails.value));
            } else {
                alert("Item removed from cart!");
                sessionStorage.setItem("cart", JSON.stringify(cartDetails.value.filter((item) => item.id !== itemId)));
                window.location.reload();
            }
        };

        const AddAddress = () => {
            const newAddress = {
                address: varObj.addressValue,
                city: varObj.cityValue,
                dist: varObj.distValue,
                state: varObj.stateValue,
                pincode: varObj.pincodeValue,
            };
            store.addAdress(newAddress);
            resetFormAndCloseDialog();
        };

        const UpdateAddress = () => {
            const updatedAddress = {
                id: selectedAddress.value,
                address: varObj.addressValue,
                city: varObj.cityValue,
                dist: varObj.distValue,
                state: varObj.stateValue,
                pincode: varObj.pincodeValue,
            };
            console.log("updatedAddress", updatedAddress)
            // store.updateAdress(updatedAddress);
            resetFormAndCloseDialog();
        };

        const openDialog = (mode) => {
            formMode.value = mode;
            visible.value = true;
        };

        const resetFormAndCloseDialog = () => {
            Object.assign(varObj, {
                addressValue: '',
                cityValue: '',
                distValue: '',
                stateValue: '',
                pincodeValue: '',
            });
            visible.value = false;
        };

        const orderNow = () => {
            const orderDetails = {
                cart: cartDetails.value,
                selectedAddress: addressesDetails.value.find((addr) => addr.id === selectedAddress.value),
                totalAmount: totalAmount.value,
            };
            store.placeOrder(orderDetails);
        };

        const getSpeedDialItems = (addressId) => [{
                label: 'Edit',
                icon: 'pi pi-pencil',
                command: () => {
                    openDialog('update');
                    console.log("addressId", addressId);
                    const address = addressesDetails.value.find((addr) => addr.id === addressId);
                    Object.assign(varObj, {
                        addressValue: address.address,
                        cityValue: address.city,
                        distValue: address.dist,
                        stateValue: address.state,
                        pincodeValue: address.pincode,
                    });
                    selectedAddress.value = addressId;
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => store.deleteAdress(addressId),
            },
        ];

        return {
            cartDetails,
            productDetails,
            addressesDetails,
            selectedAddress,
            totalQnty,
            totalAmount,
            schema,
            initialValues,
            varObj,
            formMode,
            visible,
            getProductImage,
            getProductName,
            getProductPrice,
            increment,
            decrement,
            AddAddress,
            UpdateAddress,
            openDialog,
            resetFormAndCloseDialog,
            orderNow,
            getSpeedDialItems,
        };
    },
};
</script>

<style lang="css" scoped>
button {
    width: 20%;
    background-color: #a40514;
    color: #e1e7d8;
    text-align: center;
    padding: 0;
    font-size: 16px;
    border-radius: 40px;
    font-weight: bold;
    border: none;
    cursor: pointer;
}

.invalid-feedback {
    color: red;
    font-size: 12px;
}

.is-invalid {
    border-color: red;
}

th {
    color: white;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: #1f1f1f;
}

.table-striped tbody tr:nth-of-type(even) {
    background-color: #2c2c2c;
}

.table thead th {
    background-color: #131313;
    color: #f1f0ef;
}

.table tfoot th {
    background-color: #131313;
    color: #f1f0ef;
}

.box-1 {
    width: 46rem;
    margin-right: 2rem;
}

.box-2 {
    width: 20rem;
}

.card-input-count {
    align-items: center;
}

.card-input-count button:hover {
    background-color: #ffffff;
    color: #000;
}

.card-input-count button:disabled {
    cursor: not-allowed;
}

.card-input-count input {
    width: 3rem;
    text-align: center;
    border-radius: 4px;
    font-size: 1rem;
    margin: 0.5rem 0.5rem;
}

.card-input-count .bi {
    font-size: 1.2rem;
}

.card {
    position: relative;
    max-width: 22rem;
    background-color: #1f1f1f;
    border: 1px solid #2c2c2c;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.card-body {
    color: #f1f0ef;
    padding: 1rem;
}

.card-title {
    color: #f1f0ef;
    font-size: 1.25rem;
    font-weight: bold;
    /* margin-bottom: 0.5rem; */
    margin: 0;
    padding: 0;
}

.card-text {
    font-size: 1rem;
    line-height: 1.5;
    margin-top: 0;
}

.card:hover {
    background-color: #2c2c2c;
    border-color: #3a3a3a;
}

/* @media (max-width: 768px) {
    .card {
        max-width: 100%;
    }
} */

.order_text {
    margin-bottom: 1rem;
    margin-top: 16px;
}

.err_msg {
    color: red;
}

/* Style for the Dialog component to match the theme */
.p-dialog {
    background-color: #1f1f1f !important;
    /* Matches the dark theme */
    color: #f1f0ef;
    /* Light text color for visibility */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    /* Consistent with card shadow */
}

.p-dialog .p-dialog-header {
    background-color: #131313;
    /* Darker header background */
    color: #f1f0ef;
    /* Light header text color */
}

.p-dialog .p-dialog-content {
    background-color: #1f1f1f;
    /* Consistent background color */
    color: #f1f0ef;
    /* Light text color */
}

.p-dialog .p-dialog-footer {
    background-color: #1f1f1f;
    /* Footer background to match dialog */
}

.p-dialog .p-button {
    background-color: #a40514 !important;
    /* Button background color */
    color: #e1e7d8 !important;
    /* Button text color */
    border-color: #a40514 !important;
    /* Button border color */
    border-radius: 40px;
    font-weight: bold;
}

.p-dialog .p-button:hover {
    background-color: #ffffff !important;
    /* Hover effect for buttons */
    color: #000 !important;
}

.p-inputtext {
    background-color: #2c2c2c !important;
    /* Dark input field background */
    color: #f1f0ef !important;
    /* Light input text color */
    border: 1px solid #3a3a3a;
    /* Consistent border color */
    height: 2.3rem;
}

.p-inputnumber,
.p-inputnumber input {
    background-color: #2c2c2c !important;
    color: #f1f0ef !important;
    border: 1px solid #3a3a3a;
    height: 2.3rem;
    border-radius: 4px;
    padding: 0.5rem;
    width: 100%;
    box-sizing: border-box;
}
</style>
