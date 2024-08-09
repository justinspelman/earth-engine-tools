// Define a function to create contour lines from a Digital Elevation Model (DEM)
function createContourLines(dem, region, contourInterval, gaussianKernelSize, imageVisParam) {

  // Step 1: Generate contour lines as vector features and calculate their elevation range
  // Create contour intervals by dividing the DEM by the contour interval and multiplying by a constant
  var contours = ee.Image.constant(contourInterval)
    .multiply(dem.divide(contourInterval).int()) // Create elevation steps at each contour interval
    .reduceToVectors({
      geometryType: 'polygon', // Create vector polygons for each contour interval
      reducer: ee.Reducer.countEvery(), // Count the number of pixels within each contour polygon
      scale: 30, // Use a scale of 30 meters per pixel for vectorization
      geometry: ROI, // Clip the vectors to the specified region of interest (ROI)
      maxPixels: 1e7, // Limit the number of pixels to 10 million to prevent memory issues
      bestEffort: true  // Automatically reduce resolution if necessary to stay within maxPixels limit
    })
    .map(function(feature) {
      var line = ee.Feature(feature).simplify(10); // Simplify the vector geometry for smoother lines
      var elevation = feature.get('label'); // Extract the elevation value from the 'label' property
      return line.set('elevation', elevation); // Set the elevation value as a property of the feature
    });

  // Step 2: Calculate the minimum and maximum elevation values from the generated contours
  var elevationStats = contours.reduceColumns({
    reducer: ee.Reducer.minMax(), // Use a reducer to calculate min and max elevation values
    selectors: ['elevation'] // Select the 'elevation' property from each contour feature
  });

  var minElevationValue = elevationStats.get('min'); // Store the minimum elevation value
  var maxElevationValue = elevationStats.get('max'); // Store the maximum elevation value

  // Output the minimum and maximum elevation values to the console for reference
  print('Min Elevation:', minElevationValue);
  print('Max Elevation:', maxElevationValue);

  // Step 3: Create a sequence of contour levels between the min and max elevation values
  var lines = ee.List.sequence(minElevationValue, maxElevationValue, contourInterval);

  // Step 4: Generate raster contour lines for each contour level
  var contourLines = lines.map(function(line) {
    var DEM_contour = dem
      .convolve(ee.Kernel.gaussian(gaussianKernelSize, gaussianKernelSize / 2)) // Smooth the DEM to reduce noise
      .subtract(ee.Image.constant(line)).zeroCrossing() // Detect where the elevation crosses each contour level
      .multiply(ee.Image.constant(line)).toFloat(); // Assign the contour level as a pixel value

    return DEM_contour.mask(DEM_contour); // Mask the output to only include the contour lines
  });

  // Step 5: Combine all the individual contour line images into a single image
  var contour_line = ee.ImageCollection(contourLines).mosaic().clip(region); // Mosaic and clip to ROI

  // Step 6: Visualize the results on the map
  Map.addLayer(ROI, {color: 'blue', fillColor: '800000FF', width: 3}, 'Region of Interest'); // Add ROI boundary to the map
  Map.centerObject(ROI); // Center the map view on the ROI
  Map.addLayer(contour_line, imageVisParam, 'Contour Lines'); // Add the contour lines to the map with specified visualization parameters

  // Return the contour line image and the calculated min/max elevation values
  return {
    contourLines: contour_line, // The final image of contour lines
    minElevation: minElevationValue, // The minimum elevation value within the ROI
    maxElevation: maxElevationValue // The maximum elevation value within the ROI
  };
}

// Input variables for the function
var ROI = CO; // Define your region of interest (ROI) as a geometry object
var imageVisParam = {min: 0, max: 15000, palette: ['FFFFFF']}; // Visualization parameters: color palette and value range
var interval = 2; // Contour interval in meters
var kernalSize = 15; // Gaussian kernel size for smoothing (larger for finer intervals)

// Step 7: Call the createContourLines function with the input parameters
var contourResults = createContourLines(
  srtm, // The DEM image to use for contour generation
  ROI, // The region of interest where contours should be generated
  100, // The interval between contours in meters
  5, // The Gaussian kernel size for smoothing the DEM
  imageVisParam // Visualization parameters for displaying the contours on the map
);
