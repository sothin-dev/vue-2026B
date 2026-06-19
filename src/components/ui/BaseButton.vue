<template>
    <div>
        <button class="px-4 py-2 rounded-md shadow-md font-semibold bg-blue-500 text-white" :class="props.opttionalStyle" >
            {{ props.label }}
        </button>
    </div>
</template>

<script setup>
import { defineProps} from 'vue';

const props = defineProps({
    label: {
        required: true,
        type: String,
    },
    opttionalStyle: {
        type: String,
        defualt: "",
    },
})


</script>

<style lang="scss" scoped>

</style>