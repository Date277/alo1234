import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                style={{ objectFit: "cover" }}
                src="https://routine.vn/media/banner/tmp/images/MicrosoftTeams-image_2_.jpg"
                className="d-block w-100"
                alt="https://routine.vn/media/banner/tmp/images/MicrosoftTeams-image_2_.jpg"
              />
            </div>
            <div className="carousel-item">
              <img
                style={{ objectFit: "cover" }}
                src="https://routine.vn/media/banner/tmp/images/LOVE_DESKTOP.jpg"
                className="d-block w-100"
                alt="https://routine.vn/media/banner/tmp/images/LOVE_DESKTOP.jpg"
              />
            </div>
            <div className="carousel-item">
              <img
                style={{ objectFit: "cover" }}
                src="https://routine.vn/media/banner/tmp/images/ACTIVEWEAR_-_MAIN_KV_1.jpg"
                className="d-block w-100"
                alt="https://routine.vn/media/banner/tmp/images/ACTIVEWEAR_-_MAIN_KV_1.jpg"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="site-section">
          <div className="container">
            <div className="title-section mb-5">
              <h2 className="text-uppercase">
                <span className="d-block">Discover</span> The Collections
              </h2>
            </div>
            <div className="row align-items-stretch">
              <div className="col-lg-8">
                <div className="product-item sm-height full-height bg-gray">
                  <a href="#" className="product-category">
                    Women <span>25 items</span>
                  </a>
                  <img
                    src="images/model_4.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="product-item sm-height bg-gray mb-4">
                  <a href="#" className="product-category">
                    Men <span>25 items</span>
                  </a>
                  <img
                    src="images/model_5.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
                <div className="product-item sm-height bg-gray">
                  <a href="#" className="product-category">
                    Children <span>25 items</span>
                  </a>
                  <img
                    src="https://cdn.tgdd.vn//News/1445730//mac-quan-ao-cho-tre-so-sinh-2-845x564.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="title-section mb-5 col-12">
                <h2 className="text-uppercase">Popular Products</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 item-entry mb-4">
                <a href="#" className="product-item md-height bg-gray d-block">
                  <img
                    src="images/prod_2.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h2 className="item-title">
                  <a href="#">Gray Shoe</a>
                </h2>
                <strong className="item-price">$20.00</strong>
              </div>
              <div className="col-lg-4 col-md-6 item-entry mb-4">
                <a href="#" className="product-item md-height bg-gray d-block">
                  <img
                    src="images/prod_3.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h2 className="item-title">
                  <a href="#">Blue Shoe High Heels</a>
                </h2>
                <strong className="item-price">
                  <del>$46.00</del> $28.00
                </strong>
              </div>
              <div className="col-lg-4 col-md-6 item-entry mb-4">
                <a href="#" className="product-item md-height bg-gray d-block">
                  <img
                    src="images/model_5.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h2 className="item-title">
                  <a href="#">Denim Jacket</a>
                </h2>
                <strong className="item-price">
                  <del>$46.00</del> $28.00
                </strong>
                <div className="star-rating">
                  <span className="icon-star2 text-warning" />
                  <span className="icon-star2 text-warning" />
                  <span className="icon-star2 text-warning" />
                  <span className="icon-star2 text-warning" />
                  <span className="icon-star2 text-warning" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 item-entry mb-4">
                <a href="#" className="product-item md-height bg-gray d-block">
                  <img
                    src="images/prod_1.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h2 className="item-title">
                  <a href="#">Leather Green Bag</a>
                </h2>
                <strong className="item-price">
                  <del>$46.00</del> $28.00
                </strong>
                <div className="star-rating">
                  <span className="icon-star2 text-warning" />
                  <span className="icon-star2 text-warning" />
                  <span className="icon-star2 text-warning" />
                  <span className="icon-star2 text-warning" />
                  <span className="icon-star2 text-warning" />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 item-entry mb-4">
                <a href="#" className="product-item md-height bg-gray d-block">
                  <img
                    src="images/model_1.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h2 className="item-title">
                  <a href="#">Smooth Cloth</a>
                </h2>
                <strong className="item-price">
                  <del>$46.00</del> $28.00
                </strong>
              </div>
              <div className="col-lg-4 col-md-6 item-entry mb-4">
                <a href="#" className="product-item md-height bg-gray d-block">
                  <img
                    src="images/model_7.png"
                    alt="Image"
                    className="img-fluid"
                  />
                </a>
                <h2 className="item-title">
                  <a href="#">Yellow Jacket</a>
                </h2>
                <strong className="item-price">$58.00</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="title-section text-center mb-5 col-12">
                <h2 className="text-uppercase">Most Rated</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 block-3">
                <div className="nonloop-block-3 owl-carousel">
                  <div className="item">
                    <div className="item-entry">
                      <a
                        href="#"
                        className="product-item md-height bg-gray d-block"
                      >
                        <img
                          src="images/model_1.png"
                          alt="Image"
                          className="img-fluid"
                        />
                      </a>
                      <h2 className="item-title">
                        <a href="#">Smooth Cloth</a>
                      </h2>
                      <strong className="item-price">
                        <del>$46.00</del> $28.00
                      </strong>
                      <div className="star-rating">
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-entry">
                      <a
                        href="#"
                        className="product-item md-height bg-gray d-block"
                      >
                        <img
                          src="images/prod_3.png"
                          alt="Image"
                          className="img-fluid"
                        />
                      </a>
                      <h2 className="item-title">
                        <a href="#">Blue Shoe High Heels</a>
                      </h2>
                      <strong className="item-price">
                        <del>$46.00</del> $28.00
                      </strong>
                      <div className="star-rating">
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-entry">
                      <a
                        href="#"
                        className="product-item md-height bg-gray d-block"
                      >
                        <img
                          src="images/model_5.png"
                          alt="Image"
                          className="img-fluid"
                        />
                      </a>
                      <h2 className="item-title">
                        <a href="#">Denim Jacket</a>
                      </h2>
                      <strong className="item-price">
                        <del>$46.00</del> $28.00
                      </strong>
                      <div className="star-rating">
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-entry">
                      <a
                        href="#"
                        className="product-item md-height bg-gray d-block"
                      >
                        <img
                          src="images/prod_1.png"
                          alt="Image"
                          className="img-fluid"
                        />
                      </a>
                      <h2 className="item-title">
                        <a href="#">Leather Green Bag</a>
                      </h2>
                      <strong className="item-price">
                        <del>$46.00</del> $28.00
                      </strong>
                      <div className="star-rating">
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-entry">
                      <a
                        href="#"
                        className="product-item md-height bg-gray d-block"
                      >
                        <img
                          src="images/model_7.png"
                          alt="Image"
                          className="img-fluid"
                        />
                      </a>
                      <h2 className="item-title">
                        <a href="#">Yellow Jacket</a>
                      </h2>
                      <strong className="item-price">$58.00</strong>
                      <div className="star-rating">
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                        <span className="icon-star2 text-warning" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                style={{ objectFit: "cover" }}
                src="https://routine.vn/media/banner/tmp/images/MicrosoftTeams-image_2_.jpg"
                className="d-block w-100"
                alt="https://routine.vn/media/banner/tmp/images/MicrosoftTeams-image_2_.jpg"
              />
            </div>
            <div className="carousel-item">
              <img
                style={{ objectFit: "cover" }}
                src="https://routine.vn/media/banner/tmp/images/LOVE_DESKTOP.jpg"
                className="d-block w-100"
                alt="https://routine.vn/media/banner/tmp/images/LOVE_DESKTOP.jpg"
              />
            </div>
            <div className="carousel-item">
              <img
                style={{ objectFit: "cover" }}
                src="https://routine.vn/media/banner/tmp/images/ACTIVEWEAR_-_MAIN_KV_1.jpg"
                className="d-block w-100"
                alt="https://routine.vn/media/banner/tmp/images/ACTIVEWEAR_-_MAIN_KV_1.jpg"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default HomePage;
