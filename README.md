A simple game

To build and launch:
```
npm build
npm start
```

To generate package (OSX):

```
electron-packager . turgle --platform=darwin
```

To generate package (RPI):

```
electron-packager . turgle --platform=linux --arch=armv7l
```

Notes to get it running on Raspberry PI

1) Create package with above command

2) Install on pi with this command:
```
npm install -g electron-installer-debian; # may need sudo
electron-installer-debian --src turgle-linux-armv7l/ --dest ./install --arch armhf
```
3) The game requires [gpio-admin](https://github.com/quick2wire/quick2wire-gpio-admin)

   Note:
   *Tested on Linux raspberrypi 4.4.34-v7+, I hit this [bug](https://github.com/raspberrypi/linux/issues/791). 
   This [patch](https://github.com/quick2wire/quick2wire-gpio-admin/pull/7) did the trick.*

4) and pi-gpio
```
npm install -g pi-gpio
```

