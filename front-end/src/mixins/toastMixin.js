export default {
    methods: {
        showToast(variant, title, description) {
            this.$root.$bvToast.toast(description, {
                title: title,
                autoHideDelay: 3000,
                variant: variant,
                solid: true
            });
        }
    }
}