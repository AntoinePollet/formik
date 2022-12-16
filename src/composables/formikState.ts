import { reactive } from "vue";

export const formikState = () => {

    const state = reactive<any>({
        values: {},
        touched: {},
        errors: {}
    });

    const setValues = (values: any) => {
        state.values = values;
    }

    return { state, setValues }
}