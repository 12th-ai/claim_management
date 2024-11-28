<template>
  <div class="page">
    <!-- Title and Subtitle -->
    <div class="mb-4" style="margin-top:100px">
      <h1 style="font-size:22px;margin-top:20px">Loss Accessor Management</h1>
      <p style="margin-bottom:20px">Manage loss accessor details</p>
    </div>

    <!-- Search and Add Loss Accessor Button -->
    <div class="d-flex justify-content-between mb-4">
      <div class="d-flex">
        <input v-model="searchName" type="text" class="form-control me-3" placeholder="Search by name" :disabled="isFormDisabled"/>
        <input v-model="searchDate" type="date" class="form-control" placeholder="Search by date" :disabled="isFormDisabled"/>
      </div>

      <!-- Clear Search Button -->
      <button @click="clearSearch" class="btn btn-secondary ms-3" v-if="searchName || searchDate">
        Clear Search
      </button>

      <!-- Add New Loss Accessor Button -->
      <button @click="showModal('add')" class="btn btn-primary" :disabled="isFormDisabled">
        <i class="ri-add-line"></i> Add New Loss Accessor
      </button>
    </div>

    <!-- Table -->
    <table class="table align-middle table-nowrap mt-10">
      <thead style="text-align:center;background-color:#e8e9e5;margin-top:30px">
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Loss Accessor Name</th>
          <th scope="col">Email Address</th>
          <th scope="col">Contact Number</th>
          <th scope="col">Contact Methods</th>
          <th scope="col">Offices</th>
          <th scope="col">Joining Date</th>

          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lossAccessor in currentLossAccessors" :key="lossAccessor.id" style="text-align:center">
          <th scope="row">{{ lossAccessor.id }}</th>
          <td>{{ lossAccessor.lossAccessorName }}</td>
          <td>{{ lossAccessor.emailAddress }}</td>
          <td>{{ lossAccessor.contactNumber }}</td>
        
          <td>
            {{ lossAccessor.contactMethods && lossAccessor.contactMethods.length > 0 ? lossAccessor.contactMethods.length + ' Contact Methods' : 'No Contact Methods' }}
          </td>

          <td>
            {{ lossAccessor.offices && lossAccessor.offices.length > 0 ? lossAccessor.offices.length + ' Offices' : 'No Offices' }}
          </td>

          <td>{{ new Date(lossAccessor.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-') }}</td>

          <td style="display:flex">
            <div class="hstack gap-3 fs-15" style="text-align:center;margin:auto">
                <!-- View More Button -->
                <router-link
                  :to="{ name: 'review-loss_accessor_detail', params: { id: lossAccessor.id } }"
                  class="link-primary"
                  title="View More"
                >
                  <i class="ri-eye-line"></i> 
                </router-link>
                <a href="javascript:void(0);" @click="confirmDelete(lossAccessor.id)" class="link-danger" title="Delete Loss Accessor">
                  <i class="ri-delete-bin-5-line"></i> 
                </a>
                <a href="javascript:void(0);" @click="showModal('update', lossAccessor)" class="link-primary" title="Update Loss Accessor">
                  <i class="ri-pencil-line"></i> 
                </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-4">
      <div>
        <span>Showing {{ page * itemsPerPage + 1 }} - {{ Math.min((page + 1) * itemsPerPage, filteredLossAccessors.length) }} of {{ filteredLossAccessors.length }} results</span>
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

    <!-- Loss Accessor Modal -->
    <div id="lossAccessorModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content" style="width:800px">
          <div class="modal-header">
            <h5 class="modal-title">{{ isUpdating ? 'Update Loss Accessor' : 'Add Loss Accessor' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm" enctype="multipart/form-data">
              
              <!-- Profile Image Section -->
              <div class="mb-3 text-center">
                <div class="avatar-wrapper">
                  <img 
                    :src="previewImage ? previewImage : formData.profileImage ? `http://localhost/Mua_Insurance/backend/uploads/${formData.profileImage}` : require('../../assets/images/users/avatar-1.jpg')"
                    alt="Profile Image"
                    class="rounded-circle"
                    style="width: 100px; height: 100px; object-fit: cover; cursor: pointer;"
                    @click="triggerLogoInput"
                  />
                  <input 
                    type="file" 
                    ref="logoInput" 
                    id="profileImage" 
                    style="display: none;" 
                    @change="handleFileChange"
                  />
                </div>
              </div>

              <!-- Loss Accessor Details -->
              <div class="d-flex justify-content-between">
                <div class="left-section" style="flex: 1; padding-right: 10px;">
                  <!-- Loss Accessor Name -->
                  <div class="mb-3">
                    <label for="lossAccessorName" class="form-label">Loss Accessor Name</label>
                    <input
                      type="text"
                      id="lossAccessorName"
                      class="form-control"
                      v-model="formData.lossAccessorName"
                      placeholder="Enter loss accessor name"
                      :disabled="isFormDisabled"
                    />
                  </div>

                  <!-- Email -->
                  <div class="mb-3">
                    <label for="emailAddress" class="form-label">Email Address</label>
                    <input
                      type="email"
                      id="emailAddress"
                      class="form-control"
                      v-model="formData.emailAddress"
                      placeholder="Enter email"
                      :disabled="isFormDisabled"
                    />
                  </div>

                  <!-- Contact Methods -->
                  <div class="mb-3">
                    <label for="contactMethods" class="form-label">Contact Methods</label>
                    <div v-for="(contact, index) in formData.contactMethods" :key="index" class="d-flex gap-2 mb-2">
                      <input type="text" v-model="contact.name" placeholder="Contact Method" class="form-control" :disabled="isFormDisabled"/>
                      <input type="url" v-model="contact.url" placeholder="URL" class="form-control" :disabled="isFormDisabled"/>
                      <button @click="removeContactMethod(index)" type="button" class="btn btn-danger btn-sm" :disabled="isFormDisabled">
                        <i class="ri-delete-bin-5-line"></i>
                      </button>
                    </div>
                    <button @click="addContactMethod" type="button" class="btn btn-secondary" :disabled="isFormDisabled">
                      Add Contact Method
                    </button>
                  </div>
                </div>

                <div class="right-section" style="flex: 1; padding-left: 10px;">
                  <!-- Contact Number -->
                  <div class="mb-3">
                    <label for="contactNumber" class="form-label">Contact Number</label>
                    <input
                      type="tel"
                      id="contactNumber"
                      class="form-control"
                      v-model="formData.contactNumber"
                      placeholder="Enter contact number"
                      :disabled="isFormDisabled"
                    />
                  </div>

                  <!-- Offices -->
                  <div class="mb-3">
                    <label for="offices" class="form-label">Offices</label>
                    <input 
                      type="text" 
                      id="offices" 
                      class="form-control" 
                      v-model="formData.offices" 
                      placeholder="Enter office locations"
                      :disabled="isFormDisabled"
                    />
                  </div>

                  <!-- Joining Date -->
                  <div class="mb-3">
                    <label for="createdAt" class="form-label">Joining Date</label>
                    <input 
                      type="date" 
                      id="createdAt" 
                      class="form-control" 
                      v-model="formData.createdAt" 
                      :disabled="isFormDisabled"
                    />
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="isFormDisabled"
                >
                  {{ isUpdating ? 'Update Loss Accessor' : 'Add Loss Accessor' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
