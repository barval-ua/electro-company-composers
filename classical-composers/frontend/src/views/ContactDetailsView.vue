<script lang="ts">
import httpApi from '../api';
import { Component } from 'vue';

export default {

    name: 'ContactDetailsView',
    data: () => ({
        contact: null,
        isLoadingInProgress: false,
    }),
    computed: {
        address: (that) => that.contact?.address || {},
    },
    props: {
        contactId: {
            type: Number,
            required: true,
        },
    },
    watch: {
        'contactId': {
            immediate: true, // load current contact on initialization
            handler: async function (currentContactId: number) {
                this.contact = null;
                this.isLoadingInProgress = true;
                try {
                    this.contact = await httpApi.getContactDetails(currentContactId);
                } finally {
                    this.isLoadingInProgress = false;
                }
            },
        },
    },
} as Component;
</script>

<template>
    <div class="contact-details">
        <h4>Contact Info</h4>

        <div v-if="contact">
            <div><span class="item-label">Phone Number</span>: {{ contact.phone }} </div>
            <div><span class="item-label">Email</span>: {{ contact.email }} </div>

            <h5 class="mt-3">Address</h5>

            <div>
                {{ address.streetAddr }}<br />
                {{ address.city }},
                {{ address.stateCode }},
                {{ address.postalCode }}
            </div>

        </div>
        <div v-else-if="isLoadingInProgress">
            Loading...
        </div>
        <div v-else>
            Not available
        </div>
    </div>
</template>
