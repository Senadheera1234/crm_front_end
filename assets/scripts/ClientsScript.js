import NewClientForm from '@/components/NewClientForm.vue'
import ClientsList from '@/components/ClientsList.vue'

export default {
  components: {
    NewClientForm,
    ClientsList,
  },
  data() {
    return {
      showForm: false,
      form: {
        fullName: '',
        address: '',
        mobileNumber: '',
        email: '',
        nic: '',
        birthday: '',
      },
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'Invalid email.',
        nic: (value) =>
          /^\d{9}[VvXx]$/.test(value) ||
          /^\d{12}$/.test(value) ||
          'Invalid NIC format.',
        phone: (value) => /^\d{10}$/.test(value) || 'Invalid phone number.',
      },
      clients: [], // Add clients data here
    }
  },

  methods: {
    toggleShowForm() {
      this.showForm = !this.showForm
    },
    handleFormSubmit(form) {
      console.log('Form submitted:', form)
      this.clearForm()
      this.showForm = false
    },
    handleBack() {
      this.showForm = false
    },
    clearForm() {
      this.form = {
        fullName: '',
        address: '',
        mobileNumber: '',
        email: '',
        nic: '',
        birthday: '',
      }
    },
    handleClientsFetched(clients) {
      this.clients = clients // set the clients data fetched from ClientsList.vue
    },
  },
}
