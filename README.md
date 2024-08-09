# Google Earth Engine (GEE) Tools
A set of functions and tools utilizing publicly available datasets.

## L8StandardCalculations.js Standard Calculations
This script calculates standard indices. 

### 1. NDVI (Normalized Difference Vegetation Index)
#### Description:
The NDVI expression $(nir - red) / (nir + red)$ exploits the distinct spectral signatures of vegetation, particularly the strong absorption of red light by chlorophyll and the high reflectance of NIR by the cell structure of plant leaves. This contrast is due to the fact that chlorophyll pigments absorb light in the red region (around 660 nm) for photosynthesis, while the internal leaf structure scatters NIR light (around 850 nm). This differential response allows NDVI to serve as a proxy for photosynthetic activity and biomass. In non-vegetated areas, such as water or bare soil, the reflectance in these bands is more similar, leading to NDVI values close to zero or negative. The physics behind this phenomenon is rooted in the interaction of light with plant material, particularly how light is absorbed by pigments and scattered by leaf structures.

#### Relevant References:
- Rouse, J. W., Haas, R. H., Schell, J. A., & Deering, D. W. (1974). Monitoring vegetation systems in the Great Plains with ERTS. In Third Earth Resources Technology Satellite-1 Symposium (Vol. 1, pp. 309-317).
- Tucker, C. J. (1979). Red and photographic infrared linear combinations for monitoring vegetation. Remote Sensing of Environment, 8(2), 127-150.

### 2. EVI (Enhanced Vegetation Index)
#### Description:
The EVI expression $2.5 * ((nir - red) / (nir + 6 * red - 7.5 * blue + 1))$ enhances the vegetation signal by incorporating the blue band (around 480 nm) to correct for atmospheric scattering, while the gain factor (2.5) amplifies the vegetation signal. The inclusion of the blue band helps reduce the impact of atmospheric aerosols, which can cause scattering and affect the accuracy of vegetation indices. The physics underlying EVI also considers the absorption of red light by chlorophyll and the reflection of NIR light by plant structures, similar to NDVI, but with additional correction factors that make it more robust in areas with high biomass and in regions where atmospheric conditions might distort the vegetation signal.

#### Relevant References:
- Huete, A. R., Liu, H. Q., Batchily, K., & van Leeuwen, W. (1997). A comparison of vegetation indices over a global set of TM images for EOS-MODIS. Remote Sensing of Environment, 59(3), 440-451.
- Huete, A. R., Didan, K., Miura, T., Rodriguez, E. P., Gao, X., & Ferreira, L. G. (2002). Overview of the radiometric and biophysical performance of the MODIS vegetation indices. Remote Sensing of Environment, 83(1-2), 195-213.

### 3. NDWI (Normalized Difference Water Index)
#### Description:
The NDWI expression $(green - nir) / (green + nir)$ capitalizes on the strong absorption of NIR light by water bodies and the higher reflectance of green light (around 560 nm). Water absorbs most of the NIR radiation, leading to very low reflectance in this band, while the green band reflects more light, which enhances the contrast between water and land. This differential reflectance between water and non-water surfaces is the basis for the NDWI, making it a valuable tool for delineating water features. The physics behind NDWI relates to the absorption characteristics of water molecules, which strongly absorb NIR wavelengths, as opposed to the reflectance properties of land surfaces.

#### Relevant References:
- McFeeters, S. K. (1996). The use of the Normalized Difference Water Index (NDWI) in the delineation of open water features. International Journal of Remote Sensing, 17(7), 1425-1432.
- Gao, B. C. (1996). NDWI—A normalized difference water index for remote sensing of vegetation liquid water from space. Remote Sensing of Environment, 58(3), 257-266.

### 4. NDBI (Normalized Difference Built-up Index)
#### Description:
The NDBI expression $(swir1 - nir) / (swir1 + nir)$ is based on the different reflective properties of urban areas and vegetation in the SWIR1 (Shortwave Infrared, around 1.6 µm) and NIR bands. Built-up areas, such as concrete and asphalt, tend to reflect more SWIR1 light compared to NIR, resulting in positive NDBI values. In contrast, vegetation reflects more NIR than SWIR1 light, leading to negative NDBI values. The physics behind this lies in the molecular vibrations in minerals and man-made materials, which cause them to absorb less SWIR1 light and reflect more, whereas NIR reflectance is dominated by plant structures and water content.

#### Relevant References:
- Zha, Y., Gao, J., & Ni, S. (2003). Use of normalized difference built-up index in automatically mapping urban areas from TM imagery. International Journal of Remote Sensing, 24(3), 583-594.
- Xu, H. (2008). A new index for delineating built-up land features in satellite imagery. International Journal of Remote Sensing, 29(14), 4269-4276.

### 5. SAVI (Soil Adjusted Vegetation Index)
#### Description:
The SAVI expression $((nir - red) * (1 + L)) / (nir + red + L)$ modifies the NDVI formula by including a soil brightness correction factor (L), typically set to 0.5, to account for the influence of soil reflectance in sparse vegetation areas. The need for SAVI arises from the fact that bare soil can contribute significantly to the reflectance measured by the satellite, particularly in arid and semi-arid regions where vegetation cover is low. By adjusting for soil brightness, SAVI reduces the soil's impact, providing a more accurate measurement of vegetation. The physics behind SAVI involves the interaction of light with both vegetation and the underlying soil, where soil reflectance can skew the vegetation signal if not properly adjusted.

#### Relevant References:
- Huete, A. R. (1988). A soil-adjusted vegetation index (SAVI). Remote Sensing of Environment, 25(3), 295-309.
- Qi, J., Chehbouni, A., Huete, A. R., Kerr, Y. H., & Sorooshian, S. (1994). A modified soil adjusted vegetation index. Remote Sensing of Environment, 48(2), 119-126.

### 6. NBR (Normalized Burn Ratio)
#### Description:
The NBR expression $(nir - swir2) / (nir + swir2)$ is specifically designed to detect burned areas by comparing the reflectance in the NIR and SWIR2 (around 2.2 µm) bands. Vegetation typically has high reflectance in the NIR band and low reflectance in the SWIR2 band. However, when vegetation is burned, the NIR reflectance decreases significantly, while SWIR2 reflectance increases due to the presence of charred remains and exposed soil. This results in low NBR values for burned areas. The physics behind NBR is related to the changes in surface material properties after a fire, where the charring of organic material and exposure of mineral soils alter the reflectance characteristics in these spectral bands.

#### Relevant References:
- Key, C. H., & Benson, N. C. (2006). Landscape assessment: Ground measure of severity, the Composite Burn Index; and remote sensing of severity, the Normalized Burn Ratio. In FIREMON: Fire effects monitoring and inventory system. General Technical Report RMRS-GTR-164-CD.
- Miller, J. D., & Thode, A. E. (2007). Quantifying burn severity in a heterogeneous landscape with a relative version of the delta Normalized Burn Ratio (dNBR). Remote Sensing of Environment, 109(1), 66-80.


## createContourLines.js Function
The function `createContourLines` generates contour lines from a DEM and calculates the min and max elevation values within a specified region.

1. Contours are generated by creating elevation steps and converting them into vector polygons. Each contour line represents an elevation level.
2. The minimum and maximum elevation values are calculated from the contour data, allowing us to understand the elevation range within the region.
3. A sequence of contour levels is generated based on the calculated min and max elevations.
4. For each contour level, the DEM is processed to generate contour lines, which are then masked to only display the lines.
5. All individual contour lines are combined into a single image and clipped to the region of interest.
6. The contour lines and the region of interest are visualized on the map, with specified styles and centered view.
7. The function is called with specified parameters, and the results (contour lines and elevation stats) are returned.

### Install
Just copy the createContourLines code into the script window. The function expects two inputs:
1. The NASA SRTM Digital Elevation 30m dataset as an input with variable name srtm.
2. A geometry specifying the region of interest. Add your geometry variable to the `var ROI =`.
### Things to do
1. Figure out how to make the `kernalSize` dynamic with interval and zoom.
2. I'm using `maxPixels: 1e7` and `bestEffort: true` in `.reduceToVectors()`. This probably breaks at the country and continent level.

