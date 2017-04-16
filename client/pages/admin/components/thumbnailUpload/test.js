/** Class for cropping an image. */
class Cropper {
  /**
   * <p>Creates a Cropper instance with parameters passed as an object.</p>
   * <p>Available parameters are:</p>
   * <ul>
   *  <li>size {object} (required): the dimensions of the cropped, resized image. Must have 'width' and 'height' fields. </li>
   *  <li>limit {integer}: the longest side that the cropping area will be limited to, resizing any larger images.</li>
   *  <li>canvas {HTMLElement} (required): the cropping canvas element. Instantiation fails if not provided.</li>
   *  <li>preview {HTMLElement} (required): the preview canvas element. Instantiation fails if not provided.</li>
   * </ul>
   *
   * @example
   * var editor = new Cropper({
   *  size: { width: 128, height: 128 },
   *  limit: 600,
   *  canvas: document.querySelector('.js-editorcanvas'),
   *  preview: document.querySelector('.js-previewcanvas')
   * });
   *
   * @param {object} options the parameters to be passed for instantiation
   */
  constructor(options) {
    // Check the inputs
    if (!options.size) { throw 'Size field in options is required'; }
    if (!options.canvas) { throw 'Could not find image canvas element.'; }
    if (!options.preview) { throw 'Could not find preview canvas element.'; }

    // Hold on to the values
    this.imageCanvas = options.canvas;
    this.previewCanvas = options.preview;
    this.c = this.imageCanvas.getContext("2d");
    
    // Images larger than options.limit are resized
    this.limit = options.limit || 600; // default to 600px
    // Create the cropping square with the handle's size
    this.crop = {
      size: { x: options.size.width, y: options.size.height },
      pos: { x: 0, y: 0 },
      handleSize: 10
    };

    // Set the preview canvas size
    this.previewCanvas.width = options.size.width;
    this.previewCanvas.height = options.size.height;

    // Bind the methods, ready to be added and removed as events
    this.boundDrag = this.drag.bind(this);
    this.boundClickStop = this.clickStop.bind(this);
  }

  /**
   * Set the source image data for the cropper.
   *
   * @param {String} source the source of the image to crop.
   */
  setImageSource(source) {
    this.image = new Image();
    this.image.src = source;
    this.image.onload = (e) => {
      // Perform an initial render
      this.render();
      // Listen for events on the canvas when the image is ready
      this.imageCanvas.onmousedown = this.clickStart.bind(this);
    }
  }

  /**
   * Export the result to a given image tag.
   *
   * @param {HTMLElement} img the image tag to export the result to.
   */
  export(img) {
    img.setAttribute('src', this.previewCanvas.toDataURL());
  }

  /** @private */
  render() {
    this.c.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    this.displayImage();
    this.preview();
    this.drawCropWindow();
  }

  /** @private */
  clickStart(e) {
    // Get the click position and hold onto it for the expected mousemove
    const position = { x: e.offsetX, y: e.offsetY };
    this.lastEvent = {
      position: position,
      resizing: this.isResizing(position),
      moving: this.isMoving(position)
    };
    // Listen for mouse movement and mouse release
    this.imageCanvas.addEventListener('mousemove', this.boundDrag);
    this.imageCanvas.addEventListener('mouseup', this.boundClickStop);
  }

  /** @private */
  clickStop(e) {
    // Stop listening for mouse movement and mouse release
    this.imageCanvas.removeEventListener("mousemove", this.boundDrag);
    this.imageCanvas.removeEventListener("mouseup", this.boundClickStop);
  }

  /** @private */
  isResizing(coord) {
    const size = this.crop.handleSize;
    const handle = {
      pos: {
        x: this.crop.pos.x + this.crop.size.x - size / 2,
        y: this.crop.pos.y + this.crop.size.y - size / 2
      },
      size: { x: size, y: size }
    };
    return squareContains(handle, coord);
  }

  /** @private */
  isMoving(coord) {
    return squareContains(this.crop, coord);
  }

  /** @private */
  drag(e) {
    const position = {
      x: e.offsetX,
      y: e.offsetY
    };
    // Calculate the distance that the mouse has travelled
    const dx = position.x - this.lastEvent.position.x;
    const dy = position.y - this.lastEvent.position.y;
    // Determine whether we are resizing, moving, or nothing
    if (this.lastEvent.resizing) {
      this.resize(dx, dy);
    } else if (this.lastEvent.moving) {
      this.move(dx, dy);
    }
    // Update the last position
    this.lastEvent.position = position;
    this.render();
  }

  /** @private */
  resize(dx, dy) {
    let handle = {
      x: this.crop.pos.x + this.crop.size.x,
      y: this.crop.pos.y + this.crop.size.y
    };
    // Maintain the aspect ratio
    const amount = Math.abs(dx) > Math.abs(dy) ? dx : dy;
    // Make sure that the handle remains within image bounds
    if (this.inBounds(handle.x + amount, handle.y + amount)) {
      this.crop.size.x += amount;
      this.crop.size.y += amount;
    }
  }

  /** @private */
  move(dx, dy) {
    // Get the opposing coordinates
    const tl = {
      x: this.crop.pos.x,
      y: this.crop.pos.y
    };
    const br = {
      x: this.crop.pos.x + this.crop.size.x,
      y: this.crop.pos.y + this.crop.size.y
    };
    // Make sure they are in bounds
    if (this.inBounds(tl.x + dx, tl.y + dy) &&
        this.inBounds(br.x + dx, tl.y + dy) &&
        this.inBounds(br.x + dx, br.y + dy) &&
        this.inBounds(tl.x + dx, br.y + dy)) {
      this.crop.pos.x += dx;
      this.crop.pos.y += dy;
    }
  }

  /** @private */
  displayImage() {
    // Resize the original to the maximum allowed size
    const ratio = this.limit / Math.max(this.image.width, this.image.height);
    this.image.width *= ratio;
    this.image.height *= ratio;
    // Fit the image to the canvas
    this.imageCanvas.width = this.image.width;
    this.imageCanvas.height = this.image.height;
    this.c.drawImage(this.image, 0, 0, this.image.width, this.image.height);
  }

  /** @private */
  drawCropWindow() {
    const pos = this.crop.pos;
    const size = this.crop.size;
    const radius = this.crop.handleSize / 2;
    this.c.strokeStyle = 'red';
    this.c.fillStyle = 'red';
    // Draw the crop window outline
    this.c.strokeRect(pos.x, pos.y, size.x, size.y);
    // Draw the draggable handle
    const path = new Path2D();
    path.arc(pos.x + size.x, pos.y + size.y, radius, 0, Math.PI * 2, true);
    this.c.fill(path);
  }

  /** @private */
  preview() {
    const pos = this.crop.pos;
    const size = this.crop.size;
    // Fetch the image data from the canvas
    const imageData = this.c.getImageData(pos.x, pos.y, size.x, size.y);
    if (!imageData) {
      return false;
    }
    // Prepare and clear the preview canvas
    const ctx = this.previewCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.previewCanvas.width, this.previewCanvas.height);
    // Draw the image to the preview canvas, resizing it to fit
    ctx.drawImage(this.imageCanvas,
        // Top left corner coordinates of image
        pos.x, pos.y,
        // Width and height of image
        size.x, size.y,
        // Top left corner coordinates of result in canvas
        0, 0,
        // Width and height of result in canvas
        this.previewCanvas.width, this.previewCanvas.height);
  }

  /** @private */
  inBounds(x, y) {
    return squareContains({
      pos: { x: 0, y: 0 },
      size: {
        x: this.imageCanvas.width,
        y: this.imageCanvas.height
      }
    }, { x: x, y: y });
  }
}

function exceptionHandler(message) {
  console.log(message);
}

// Auto-resize the cropped image
var dimensions = { width: 128, height: 128 };

try {
    var uploader = new Uploader({
        input: document.querySelector('.js-fileinput'),
        types: [ 'gif', 'jpg', 'jpeg', 'png' ]
    });

    var editor = new Cropper({
        size: dimensions,
        canvas: document.querySelector('.js-editorcanvas'),
        preview: document.querySelector('.js-previewcanvas')
    });

    // Make sure both were initialised correctly
    if (uploader && editor) {
        // Start the uploader, which will launch the editor
        uploader.listen(editor.setImageSource.bind(editor), (error) => { throw error; });
    }
    // Allow the result to be exported as an actual image
    var img = document.createElement('img');
    document.body.appendChild(img);
    document.querySelector('.js-export').onclick = (e) => editor.export(img);

} catch (error) {
    exceptionHandler(error.message);
}