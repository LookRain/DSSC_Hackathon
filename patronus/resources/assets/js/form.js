

// var model = new Survey.Model(surveyJSON);
// new Vue({ el: '#surveyContainer', data: { survey: model } });
// Vue.component('survey-form', {
// 	template: `
// 	<div>
// 	<input type="text" />
// 	</div>		
// 	`,
// 	data() {
// 		return {
// 			result: {}
// 		}
// 	}
// });
class Errors {
    /**
     * Create a new Errors instance.
     */
     constructor() {
     	this.errors = {};
     }


    /**
     * Determine if an errors exists for the given field.
     *
     * @param {string} field
     */
     has(field) {
     	return this.errors.hasOwnProperty(field);
     }


    /**
     * Determine if we have any errors.
     */
     any() {
     	return Object.keys(this.errors).length > 0;
     }


    /**
     * Retrieve the error message for a field.
     *
     * @param {string} field
     */
     get(field) {
     	if (this.errors[field]) {
     		return this.errors[field][0];
     	}
     }


    /**
     * Record the new errors.
     *
     * @param {object} errors
     */
     record(errors) {
     	this.errors = errors;
     }


    /**
     * Clear one or all error fields.
     *
     * @param {string|null} field
     */
     clear(field) {
     	if (field) {
     		delete this.errors[field];

     		return;
     	}

     	this.errors = {};
     }
 }


 class Form {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
     constructor(data) {
     	this.originalData = data;

     	for (let field in data) {
     		this[field] = data[field];
     	}

     	this.errors = new Errors();
     }


    /**
     * Fetch all relevant data for the form.
     */
     data() {
     	let data = {};

     	for (let property in this.originalData) {
     		data[property] = this[property];
     	}

     	return data;
     }


    /**
     * Reset the form fields.
     */
     reset() {
     	for (let field in this.originalData) {
     		this[field] = '';
     	}

     
     }


    /**
     * Send a POST request to the given URL.
     * .
     * @param {string} url
     */
     post(url) {
     	return this.submit('post', url);
     }


    /**
     * Send a PUT request to the given URL.
     * .
     * @param {string} url
     */
     put(url) {
     	return this.submit('put', url);
     }


    /**
     * Send a PATCH request to the given URL.
     * .
     * @param {string} url
     */
     patch(url) {
     	return this.submit('patch', url);
     }


    /**
     * Send a DELETE request to the given URL.
     * .
     * @param {string} url
     */
     delete(url) {
     	return this.submit('delete', url);
     }


    /**
     * Submit the form.
     *
     * @param {string} requestType
     * @param {string} url
     */
     submit(requestType, url) {
     	return new Promise((resolve, reject) => {
     		axios[requestType](url, this.data())
     		.then(response => {
     			this.onSuccess(response.data);

     			resolve(response.data);
     		})
     		.catch(error => {
     			this.onFail(error.response.data);

     			reject(error.response.data);
     		});
     	});
     }


    /**
     * Handle a successful form submission.
     *
     * @param {object} data
     */
     onSuccess(data) {
        console.log("Submitted successfully!"); // temporary

    }


    /**
     * Handle a failed form submission.
     *
     * @param {object} errors
     */
     onFail(errors) {
     	this.errors.record(errors);
     }
 }


 new Vue({
 	el: '#survey',

 	data: {
 		form: new Form({
 			field1: '',
 			field2: '',
 			field3: '',
 			field4: '',
 			field5: '',
 			field6: '',
 			field7: '',
 			field8: '',
 			field9: '',
 			field10: '',
 			field11: '',
 			field12: '',
 			field13: '',
 			field14: '',
 			field15: '',
 			field16: '',
 			field17: '',
 			field18: '',
 			field19: '',
 	
 		})
 	},

 	methods: {
 		onSubmit() {
 			this.form.post('/submit')
 			.then(response => alert('Submitted Successfully!'));
 		}
 	}
 });

