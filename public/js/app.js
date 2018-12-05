class Errors {

    constructor(errors) {
        this.errors = {}
    }

    get(field) {
        if(this.errors[field]) {
            return this.errors[field][0];
        }

    }

    has(field) {
       
        return this.errors.hasOwnProperty(field);

    }

    any(field) {
       
        return Object.keys(this.errors).length > 0; 

    }

    record(errors) {
        this.errors = errors;
    }

    clear(field) {
        delete this.errors[field];
    }

}

new Vue({

    el: '#app',

    data: {
        name: '',
        description: '',
        errors: new Errors()
    },

    methods: {

        onSubmit(){
            axios.post('/projects', this.$data)
                .then(response => alert('Project created'))
                .catch(error => 
                    this.errors.record(error.response.data.errors)
                );
        }

    }

});