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

        if(field) {
            delete this.errors[field];
            return;

        } 

        this.errors = {};
    }

}

class Form {

    constructor(data) {

        this.originalData = data;

        for(let field in data){
            this[field] = data[field]
        };

        this.errors = new Errors();

    }

    reset() {


        for(let field in this.originalData){
            this[field] = ''
        };

        this.errors.clear();

    }

    data() {

        let data = {};

        for(let property in this.originalData) {
        
            data[property] = this[property];
        
        }


        return data;


    }

    submit(requestType, url) {

        return new Promise((resolve, reject) => {
            axios[requestType](url, this.data())
                .then(
                    response => {
                        this.onSuccess(response.data);
                        
                        resolve(response.data);
                    })
                .catch(error => {
                    
                    this.onFail(error.response.data.errors);

                    reject(error.response.data.errors);

                })
        });

         
    }

    onSuccess(data) {
        alert(data.message);

        this.reset();

    }

    onFail(error) {
        this.errors.record(error)
    }
}

new Vue({

    el: '#app',

    data: {

        form: new Form ({
            name: '',
            description: ''
        }),
        
       
    },

    methods: {

        onSubmit(){
            
            this.form.submit('post', '/projects')
                .then(data => console.log(data))
                .catch(error => console.log(error));
           
        },

    }

});