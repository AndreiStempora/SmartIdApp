FONTS
    in assets/fonts folder add the font files with extension .ttf
    in src/common/styles/constants define the used fonts
    in console write and restart the project to take effect:  

    npx react-native-asset 
ICONS
    in assets/icons folder add the icon files with extension .svg
    in terminal run the command: node generateSVGcomponents.js to generate the icon components TWICE
    in assets/generatedIcons folder the generated components will be found, add them to git,
    to use icons, use component icon from src/common/components/icons/Icon

    node generateSVGcomponents.js

CAMERA 
    Android:
        <uses-permission android:name="android.permission.CAMERA" /> this in manifest file
    

FILES 
    Android:
        <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION" /> this in manifest file

SPLASH SCREEN
    Android: 
        - settings.gradle
        include ':react-native-splash-screen'
        project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')
        - app/build.gradle
         in dependencies:
                implementation project(':react-native-splash-screen')
    
        go to https://apetools.webprofusion.com/#/tools/imagegorilla and generate the splash screen images and the icon images
APP ICON 
    Android:
        - create a 1024x1024 image and go to https://apetools.webprofusion.com/#/tools/imagegorilla and generate the icon images
        - in android/app/src/main/res folder add the generated images in the folders with the same name

---------------------------------------------------------
npm i react-native-svg
npm i react-native-svg-transformer
npm i react-redux
npm i @reduxjs/toolkit
npm i @react-native-async-storage/async-storage
npm i @react-navigation/native
npm i @react-navigation/stack
npm i react-native-screens
npm i react-native-safe-area-context
npx react-devtools
npm i axios
npm install react-native-responsive-pixels --save
npm i react-native-vision-camera
npm i @react-native-ml-kit/barcode-scanning
npm i @react-native-community/netinfo
npm i react-native-confirmation-code-field
npm i react-native-blob-util
npm i react-native-document-picker
npm i @openspacelabs/react-native-zoomable-view
npm i @react-native-community/blur
npm i react-native-webview
npm i react-native-keyboard-aware-scroll-view
npm i react-native-splash-screen










https://www.npmjs.com/package/react-native-responsive-pixels



npx react-native start --experimental-debugger
