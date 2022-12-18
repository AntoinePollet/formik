<template>
    <div class="grid">
        <img
        v-for="option in options"
        :class="{ selected: option.id === value?.id }"
        :src="option.src"
        @click="handleClick(option)"
        />
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, PropType, toRefs } from "vue";

    export default defineComponent({
        props: {
            options: {
                type: Array as PropType<{ id: string, src: string }[]>,
                required: true,
            },
            value: {
                type: Object,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
        },
        setup(props, { emit }) {
            const { options, value, name } = toRefs(props);
            // const emit = defineEmits({
            //     "update:value": function validate(value) {
            //     return typeof value === "object" && value.id && value.src;
            //     },
            // });
  
            const handleClick = (option: any) => {
                console.log('handleClick')
                // emit("update:value", unref(option));
                emit("toto", { target: { value: option, name: props.name } });
            };

            return { handleClick, options, value, name }
        }
    })
  
  </script>
  
  <style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
  .selected {
    border: 5px solid magenta;
  }
  </style>