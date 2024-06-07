# Framework-Design

# Image-Slider-WebComponent

## Overview

The Image Slider is a custom web component that displays a series of images in a sliding carousel format. Users can navigate through the images manually using navigation buttons, or the slider can automatically cycle through the images at a specified interval. Additionally, the component can display indicators showing the current image in the sequence.

This documentation provides an overview of the implementation of the Image Slider using HTML, CSS, and JavaScript.

## Features

- **Image Slider:** Displays a series of images in a sliding carousel.
- **Navigation Buttons:** Users can manually navigate to the previous or next image.
- **Auto Slide:** Automatically cycles through the images at a specified interval.
- **Size Customization:** Allows setting custom width and height for the slider.
- **Indicators:** Displays dots indicating the current image in the sequence.

## Implementation Details

- **HTML Structure:** The Image Slider component is structured using HTML and consists of the following elements:
  - A container for the slider.
  - A series of images.
  - Navigation buttons for moving to the previous or next image.
  - Optional indicators for displaying the current image index.
- **CSS Styling:** CSS is used to style the Image Slider, providing a visually appealing design. It includes styling for:
  - The slider container.
  - The sliding images.
  - Navigation buttons.
  - Indicators showing the current image index.
- **JavaScript Functionality:** JavaScript handles the slider logic and interactivity. Key functionalities include:
  - Managing the current image index.
  - Handling manual navigation through the images.
  - Automatically cycling through images at a specified interval.
  - Updating the indicators to reflect the current image.
  - Adjusting the size of the slider based on provided attributes.

## Usage

To use the Image Slider component:

1. **Include the JavaScript File**

   Open your main HTML page and add the provided JavaScript file:
   ```html
   <script src="ImageSlider.js"></script>
   ```
2. **Add the Image Slider Component**

   Add the Image Slider component to your HTML code:
    ```html
   <image-slider width="600" height="400" interval="2000" autoslide show-indicator>
    <img src="dog1.jpg" alt="Image 1">
    <img src="dog2.jpg" alt="Image 2">
    <img src="dog3.jpg" alt="Image 3">
    </image-slider>  
   ```
3. **Customize Attributes**
   - width: Set the width of the slider (default is 600px).
   - height: Set the height of the slider (default is 400px).
   - interval: Set the auto-slide interval in milliseconds (default is 3000 ms).
   - autoslide: Enable or disable auto-slide (default is disabled).
   - show-indicator: Display the indicators showing the current image index (default is disabled).
  
## Example

Here is an example of how to integrate the Image Slider WebComponent into your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Slider Component</title>
</head>
<body>
  <h1>Image Slider Example</h1>
  <image-slider width="600" height="400" interval="2000" autoslide show-indicator>
    <img src="dog1.jpg" alt="Image 1">
    <img src="dog2.jpg" alt="Image 2">
    <img src="dog3.jpg" alt="Image 3">
  </image-slider>
  <script src="ImageSlider.js"></script>
</body>
</html>
```
