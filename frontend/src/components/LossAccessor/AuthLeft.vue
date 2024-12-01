<template>
  <div className="col-lg-6">
    <div className="p-lg-5 p-4 auth-one-bg h-100">
      <div className="bg-overlay"></div>
      <div className="position-relative h-100 d-flex flex-column">
        <div className="mb-4">
          <p style="font-size: 30px; color: white; text-transform: capitalize">
            Claim Insta 
          </p>
        
        </div>
        <div className="mt-auto">
          <div className="mb-3">
            <i className="ri-double-quotes-l display-4 text-success" />
          </div>
          <div
            id="qoutescarouselIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#qoutescarouselIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#qoutescarouselIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#qoutescarouselIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner text-center text-white-50 pb-5">
              <div class="carousel-item active">
                <p class="fs-15 fst-italic">
                  "Claim Insta made the entire process of filing my insurance claim seamless and easy. The customer service was top-notch!"
                </p>
              </div>
              <div class="carousel-item">
                <p class="fs-15 fst-italic">
                  "I was able to track my claim's status in real-time, and the response time was amazing. Highly recommend this service!"
                </p>
              </div>
              <div class="carousel-item">
                <p class="fs-15 fst-italic">
                  "The interface is clean and intuitive, making it a breeze to submit and manage my claim. A truly great experience!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
