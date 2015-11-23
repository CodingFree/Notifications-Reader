mypath = ./style/icons
mainicon = 640.png

package:
	zip package.zip -r scripts manifest.json style

resizer:
	convert $(mypath)/$(mainicon) -resize 512x512 $(mypath)/512.png
	convert $(mypath)/$(mainicon) -resize 256x256 $(mypath)/256.png
	convert $(mypath)/$(mainicon) -resize 128x128 $(mypath)/128.png
	convert $(mypath)/$(mainicon) -resize 90x90 $(mypath)/90.png
	convert $(mypath)/$(mainicon) -resize 64x64 $(mypath)/64.png
	convert $(mypath)/$(mainicon) -resize 48x48 $(mypath)/48.png
	convert $(mypath)/$(mainicon) -resize 32x32 $(mypath)/32.png
	convert $(mypath)/$(mainicon) -resize 16x16 $(mypath)/16.png
