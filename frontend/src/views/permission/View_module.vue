<template>
  <div class="page">
    <!-- Title and Subtitle -->
    <div class="mb-4" style="margin-top:100px">
      <h1 style="font-size:22px;margin-top:20px">System Module</h1>
      <p style="margin-bottom:20px">Manage Whole system module data</p>
    </div>

  <!-- Search and Add Module Button -->

<div class="d-flex justify-content-between mb-4">
  <div class="d-flex">
    <input v-model="searchName" type="text" class="form-control me-3" placeholder="Search by name" :disabled="isFormDisabled"/>
    <input v-model="searchDate" type="date" class="form-control" placeholder="Search by date" :disabled="isFormDisabled"/>
  </div>
  
  <!-- Clear Search Button, only visible if there are search terms -->
  <button @click="clearSearch" class="btn btn-secondary ms-3" v-if="searchName || searchDate">
    Clear Search
  </button>
  
  <!-- Add New Module Button -->
  <button @click="showModal('add')" class="btn btn-primary" :disabled="isFormDisabled">
    <i class="ri-add-line"></i> Add New Module
  </button>
</div>



    <!-- Table -->
    <table class="table align-middle table-nowrap mt-10">
      <thead   style="text-align:center;background-color:#e8e9e5;margin-top:30px">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Module Name</th>
          <th scope="col">Description</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module in filteredModules" :key="module.id" style="text-align:center">
          <th scope="row">{{ module.id }}</th>
          <td>{{ module.module_name }}</td>
          <td>{{ module.description }}</td>
          <td>{{ formatDate(module.createdAt) }}</td>
          <td>
            <span :class="`badge bg-${module.isActive ? 'success' : 'danger'}-subtle text-${module.isActive ? 'success' : 'danger'}`">
              {{ module.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td style="display:flex">
            <div class="hstack gap-3 fs-15" style="text-align:center;margin:auto">
              <a href="javascript:void(0);" @click="showModal('update', module)" class="link-primary" title="Update Module" :disabled="isFormDisabled">
                <i class="ri-edit-line"></i>
              </a>
              <a href="javascript:void(0);" @click="confirmDelete(module.id)" class="link-danger" title="Delete Module" :disabled="isFormDisabled">
                <i class="ri-delete-bin-5-line"></i>
              </a>
              <a href="javascript:void(0);" @click="toggleStatus(module)" class="link-warning" title="Toggle Status" :disabled="isFormDisabled">
                <i :class="module.isActive ? 'ri-toggle-fill' : 'ri-toggle-line'"></i>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <div>
        <span>Showing {{ page * itemsPerPage + 1 }} - {{ Math.min((page + 1) * itemsPerPage, modules.length) }} of {{ modules.length }} results</span>
      </div>
      <div id="pagination-container">
        <button @click="changePage(page - 1)" :disabled="page === 0 || isFormDisabled" class="btn btn-sm btn-secondary">
          Previous
        </button>
        <button v-for="(buttonPage, index) in pageButtons" :key="index"
                :class="['btn btn-sm', { 'btn-primary': page === index }]"
                @click="changePage(index)" :disabled="isFormDisabled">
          {{ index + 1 }}
        </button>
        <button @click="changePage(page + 1)" :disabled="page === maxPage || isFormDisabled" class="btn btn-sm btn-secondary">
          Next
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div id="moduleModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isUpdating ? 'Update Module' : 'Add Module' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="moduleName" class="form-label">Module Name</label>
                <input
                  type="text"
                  id="moduleName"
                  class="form-control"
                  v-model="formData.module_name"
                  placeholder="Enter module name"
                  :disabled="isFormDisabled"
                />
              </div>
              <div class="mb-3">
                <label for="moduleDescription" class="form-label">Module Description</label>
                <textarea
                  id="moduleDescription"
                  class="form-control"
                  v-model="formData.description"
                  rows="3"
                  placeholder="Enter module description"
                  :disabled="isFormDisabled"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="isFormDisabled">Close</button>
            <button type="button" class="btn btn-primary"  :disabled="isFormDisabled"  @click="handleSubmit">
              {{ isUpdating ? 'Update Module' : 'Add Module' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ModuleService } from '../../services/Admin/module'; // Adjust the path
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      modules: [],
      searchName: '',
      searchDate: '',
      page: 0,
      itemsPerPage: 6,
      formData: {
        module_name: '',
        description: '',
        id: null,
      },
      isUpdating: false,
      isFormDisabled: false, // Add flag to disable form
    };
  },
  computed: {
  // Clear search fields and reset filtered modules
  clearSearch() {
  this.searchName = '';
  this.searchDate = '';
  
  // Reset filteredModules correctly
  this.filteredModules.splice(0, this.filteredModules.length, ...this.modules); // Reset using splice
}
,
    filteredModules() {
      return this.modules
        .filter(module => module.module_name.toLowerCase().includes(this.searchName.toLowerCase()))
        .filter(module => {
          if (this.searchDate) {
            return module.createdAt.startsWith(this.searchDate);
          }
          return true;
        })
        .slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage);
    },
    pageButtons() {
      return Array.from({ length: Math.ceil(this.modules.length / this.itemsPerPage) });
    },
    maxPage() {
      return Math.ceil(this.modules.length / this.itemsPerPage) - 1;
    },
  },
  methods: {
    showModal(mode, module = null) {
      this.isUpdating = mode === 'update';
      if (this.isUpdating && module) {
        this.formData = { ...module };
      } else {
        this.formData = { module_name: '', description: '', id: null };
      }
      const modal = new bootstrap.Modal(document.getElementById('moduleModal'), {});
      modal.show();
    },
    // Add Module
    async addModule() {
      this.isFormDisabled = true; // Disable the form when submitting
      try {
        await ModuleService.createModule(this.formData);
        Swal.fire('Success', 'Module added successfully!', 'success');
        this.fetchModules(); // Refresh the modules list after adding
      } catch (error) {
        Swal.fire('Error', 'Failed to add module!', 'error');
      } finally {
        this.isFormDisabled = false; // Re-enable the form after submission
      }
    },
    // Update Module
    async updateModule() {
      this.isFormDisabled = true; // Disable the form when submitting
      try {
        await ModuleService.updateModule(this.formData.id, this.formData);
        Swal.fire('Success', 'Module updated successfully!', 'success');
        this.fetchModules(); // Refresh the modules list after updating
      } catch (error) {
        Swal.fire('Error', 'Failed to update module!', 'error');
      } finally {
        this.isFormDisabled = false; // Re-enable the form after submission
      }
    },
    // Submit Form
    async handleSubmit() {
      if (this.isUpdating) {
        await this.updateModule();
      } else {
        await this.addModule();
      }
    },
    async handleSubmit() {
      if (this.isUpdating) {
        await this.updateModule(); // Call update if it's in update mode
      } else {
        await this.addModule(); // Call add if it's in add mode
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    changePage(newPage) {
      if (newPage >= 0 && newPage <= this.maxPage) {
        this.page = newPage;
      }
    },
    async fetchModules() {
      try {
        const data = await ModuleService.fetchModules();
        this.modules = data;
      } catch (error) {
        console.error('Failed to fetch modules:', error);
      }
    },
    async toggleStatus(module) {
      const action = module.isActive ? 'deactivate' : 'activate';

      const confirmation = await Swal.fire({
        title: `Are you sure you want to ${action} this module?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (confirmation.isConfirmed) {
        try {
          // Call the appropriate service function
          if (module.isActive) {
            await ModuleService.deactivateModule(module.id);
          } else {
            await ModuleService.activateModule(module.id);
          }

          // Update module status locally
          module.isActive = !module.isActive;

          Swal.fire(`Module ${action}d successfully!`, '', 'success');
        } catch (error) {
          console.error(`Failed to ${action} module`, error);
          Swal.fire(`Failed to ${action} module`, 'Something went wrong', 'error');
        }
      }
    },
    async confirmDelete(id) {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });

      if (confirmation.isConfirmed) {
        await this.deleteModule(id);
      }
    },
    async deleteModule(id) {
      try {
        await ModuleService.deleteModule(id);
        this.modules = this.modules.filter(m => m.id !== id);
        Swal.fire('Deleted!', 'Your module has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error!', 'Unable to delete module.', 'error');
      }
    },
  },
  mounted() {
    this.fetchModules();
  },
};
</script>

<style scoped>
.page {
  padding: 20px;
  width: 80%;
  margin-left: 345px;
}

#pagination-container button {
  margin-right: 10px;
}

.pagination .btn-primary {
  background-color: #6259ca;
  border-color: #007bff;
}

/* Base styles for table rows */
.table tbody tr:nth-child(odd) {
  background-color: #f6f4f3; /* Light gray for the first row */
}

.table tbody tr:nth-child(even) {
  background-color: #f7f7f7; /* Lighter gray for the second row */
}

/* Hover effect for rows */
.table tbody tr:hover {
  background-color: #d1d1d1; /* Darker gray for hover effect */
}

.table tbody tr:nth-child(odd):hover {
  background-color:#f3f6f6; /* Darker gray for odd rows on hover */
}

.table tbody tr:nth-child(even):hover {
  background-color: #f3f6f4; /* Darker gray for even rows on hover */
}
</style>
