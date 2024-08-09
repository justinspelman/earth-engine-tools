// Standard calculations using the USGS Landsat 8 Collection 2 Tier 1 TOA Reflectance
var ROI = CO; // Define your region of interest (ROI) as a geometry object

var image = L8
.filterBounds(ROI)
.filterMetadata('CLOUD_COVER', 'less_than', 1)
.filterDate('2016-01-01', '2017-12-31')
.median();

// Select each band individually with lowercase variable names
var coastal = image.select('B1');  // Coastal/Aerosol
var blue = image.select('B2');  // Blue
var green = image.select('B3');  // Green
var red = image.select('B4');  // Red
var nir = image.select('B5');  // Near Infrared (NIR)
var swir1 = image.select('B6');  // Shortwave Infrared (SWIR1)
var swir2 = image.select('B7');  // Shortwave Infrared (SWIR2)
var pan = image.select('B8');  // Panchromatic
var cirrus = image.select('B9');  // Cirrus
var tirs1 = image.select('B10'); // Thermal Infrared 1 (TIRS1)
var tirs2 = image.select('B11'); // Thermal Infrared 2 (TIRS2)
var qa_pixel = image.select('QA_PIXEL');  // Quality Assessment Pixel
var qa_radsat = image.select('QA_RADSAT'); // Quality Assessment Radiometric Saturation
var saa = image.select('SAA'); // Solar Azimuth Angle
var sza = image.select('SZA'); // Solar Zenith Angle
var vaa = image.select('VAA'); // View Azimuth Angle
var vza = image.select('VZA'); // View Zenith Angle

// Calculate NDVI (Normalized Difference Vegetation Index)
var ndvi = image
.expression(
  '(nir - red) / (nir + red)', {
    'nir': nir,
    'red': red
})
.clip(ROI)
.rename('NDVI');

// NDVI visualization
var ndviVis = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.centerObject(ROI); // Center the map view on the ROI
Map.addLayer(ROI, {color: 'blue', fillColor: '800000FF', width: 3}, 'Region of Interest'); // Add ROI boundary to the map
Map.addLayer(ndvi, ndviVis, 'NDVI');
  
// Calculate EVI (Enhanced Vegetation Index)
var evi = image
.expression(
  '2.5 * ((nir - red) / (nir + 6 * red - 7.5 * blue + 1))', {
    'nir': nir,
    'red': red,
    'blue': blue
})
.clip(ROI)
.rename('EVI');

// EVI visualization
var eviVis = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(evi, eviVis, 'EVI');

// Calculate NDWI (Normalized Difference Water Index)
var ndwi = image
.expression(
  '(green - nir) / (green + nir)', {
    'green': green,
    'nir': nir
})
.clip(ROI)
.rename('NDWI');

// NDWI visualization
var ndwiVis = {min: -1, max: 1, palette: ['blue', 'white']};
Map.addLayer(ndwi, ndwiVis, 'NDWI');

// Calculate NDBI (Normalized Difference Built-up Index)
var ndbi = image
.expression(
  '(swir1 - nir) / (swir1 + nir)', {
    'swir1': swir1,
    'nir': nir
})
.clip(ROI)
.rename('NDBI');

// NDBI visualization
var ndbiVis = {min: -1, max: 1, palette: ['brown', 'white']};
Map.addLayer(ndbi, ndbiVis, 'NDBI');

// Calculate SAVI (Soil Adjusted Vegetation Index)
var L = 0.5; // Soil brightness correction factor, typically 0.5
var savi = image
.expression(
  '((nir - red) * (1 + L)) / (nir + red + L)', {
    'nir': nir,
    'red': red,
    'L': L
})
.clip(ROI)
.rename('SAVI');

// SAVI visualization
var saviVis = {min: -1, max: 1, palette: ['yellow', 'green']};
Map.addLayer(savi, saviVis, 'SAVI');

// Calculate NBR (Normalized Burn Ratio)
var nbr = image
.expression(
  '(nir - swir2) / (nir + swir2)', {
    'nir': nir,
    'swir2': swir2
})
.clip(ROI)
.rename('NBR');

// NBR visualization
var nbrVis = {min: -1, max: 1, palette: ['white', 'black']};
Map.addLayer(nbr, nbrVis, 'NBR');
