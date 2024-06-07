class ImageSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.intervalDuration = 3000;
    this.interval = null;
  }

  static get observedAttributes() {
    return ['width', 'height', 'interval', 'autoslide', 'show-indicator'];
  }

  attributeChangedCallback(name) {
    if (name === 'width' || name === 'height') {
      this.updateSize();
    } else if (name === 'interval') {
      this.updateInterval();
    } else if (name === 'autoslide') {
      this.updateAutoSlide();
    } else if (name === 'show-indicator') {
      this.renderIndicators();
    }
  }

  connectedCallback() {
    this.images = Array.from(this.querySelectorAll('img')).map(img => img.src);
    this.render();
    this.updateSize();
    this.updateInterval();
    this.updateAutoSlide();
    this.renderIndicators();
  }

  updateSize() {
    const width = this.getAttribute('width') || '100%';
    const height = this.getAttribute('height') || '300px';
    const slider = this.shadowRoot.querySelector('.slider');
    if (slider) {
      slider.style.width = width;
      slider.style.height = height;
    }
  }

  updateInterval() {
    const interval = parseInt(this.getAttribute('interval'), 10);
    if (!isNaN(interval)) {
      this.intervalDuration = interval;
      this.resetAutoSlide();
    }
  }

  updateAutoSlide() {
    if (this.hasAttribute('autoslide')) {
      this.startAutoSlide();
    } else {
      this.clearAutoSlide();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .slider {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        .slides {
          display: flex;
          transition: transform 0.5s ease-in-out;
        }
        .slide {
          min-width: 100%;
          box-sizing: border-box;
        }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .nav {
          position: absolute;
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
        }
        .nav button {
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          padding: 10px;
          cursor: pointer;
        }
        .indicator {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
        }
        .indicator div {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          margin: 0 5px;
          cursor: pointer;
        }
        .indicator .active {
          background: white;
        }
      </style>
      <div class="slider">
        <div class="slides" style="transform: translateX(-${this.currentIndex * 100}%);">
          ${this.images.map(src => `<div class="slide"><img src="${src}" /></div>`).join('')}
        </div>
        <div class="nav">
          <button id="prev">&lt;</button>
          <button id="next">&gt;</button>
        </div>
        ${this.hasAttribute('show-indicator') ? '<div class="indicator"></div>' : ''}
      </div>
    `;

    this.shadowRoot.querySelector('#prev').addEventListener('click', () => this.prevSlide());
    this.shadowRoot.querySelector('#next').addEventListener('click', () => this.nextSlide());
    this.renderIndicators();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateSlide();
    this.resetAutoSlide();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateSlide();
    this.resetAutoSlide();
  }

  updateSlide() {
    const slides = this.shadowRoot.querySelector('.slides');
    slides.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    this.updateIndicators();
  }

  startAutoSlide() {
    if (!this.interval) {
      this.interval = setInterval(() => this.nextSlide(), this.intervalDuration);
    }
  }

  resetAutoSlide() {
    this.clearAutoSlide();
    if (this.hasAttribute('autoslide')) {
      this.startAutoSlide();
    }
  }

  clearAutoSlide() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  renderIndicators() {
    if (this.hasAttribute('show-indicator')) {
      const indicator = this.shadowRoot.querySelector('.indicator');
      if (indicator) {
        indicator.innerHTML = this.images.map((_, index) => `<div data-index="${index}" class="${index === this.currentIndex ? 'active' : ''}"></div>`).join('');
        indicator.querySelectorAll('div').forEach(dot => dot.addEventListener('click', (e) => this.goToSlide(e.target.dataset.index)));
      }
    }
  }

  updateIndicators() {
    if (this.hasAttribute('show-indicator')) {
      const indicator = this.shadowRoot.querySelector('.indicator');
      if (indicator) {
        Array.from(indicator.children).forEach((dot, index) => {
          dot.classList.toggle('active', index === this.currentIndex);
        });
      }
    }
  }

  goToSlide(index) {
    this.currentIndex = parseInt(index, 10);
    this.updateSlide();
    this.resetAutoSlide();
  }

  disconnectedCallback() {
    this.clearAutoSlide();
  }
}

customElements.define('image-slider', ImageSlider);