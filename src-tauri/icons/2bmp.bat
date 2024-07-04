@REM Convert PNG to BMP for NSIS and WIX installers, magick is ImageMagick command line tool for image conversion and manipulation https://imagemagick.org/index.php

magick ./headers/brender-studio-header-nsis.png BMP2:./headers/brender-studio-header-nsis.bmp
magick ./headers/brender-studio-header-wix.png BMP2:./headers/brender-studio-header-wix.bmp

magick ./side/brender-side-nsis.png BMP2:./side/brender-side-nsis.bmp
magick ./side/brender-side-wix.png BMP2:./side/brender-side-wix.bmp