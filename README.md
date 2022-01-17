# Realm React Native Tutorial

Follow along at https://docs.mongodb.com/realm/tutorial/react-native/

## Prerequisite

### Tools
- [Node JS](https://nodejs.org/en/download/)
- [react-native npm package](https://www.npmjs.com/package/react-native)
- [Java 11](https://adoptium.net/?variant=openjdk11&jvmVariant=hotspot)
- [Android SDK](https://developer.android.com/about/versions/12/setup-sdk)
- [Android SDK Platform](https://developer.android.com/about/versions/12/setup-sdk)
- Android Virtual Device (AVD)
- IDE (e.g. [Android Studio](https://developer.android.com/studio))

### Cloud Platform
- Access to [Mongo Atlas](https://cloud.mongodb.com/)

## Troubleshooting

The most common issue is schema mismatch due to frequent little tweaks to the
schema as you develop your app.

- Be sure to **check the logs in Realm UI** for more information as well as the console in your app.
- **Delete the app from the simulator** to purge local data.
- **Restart Sync** in the Realm UI by clicking "Delete Synced Data" on the Sync page.
- Be sure to **deploy your changes** in the Realm UI.
- If your schema does not match the server, **compare the class definitions from the SDKs tab in the Realm UI** with those in the client code.
- When creating objects, make sure the **partition value of your new object matches** the partition value you opened the Realm with.

## Issues & Pull Requests

If you find an issue or have a suggestion, please let us know using the feedback
widget on the [docs site](http://docs.mongodb.com/realm/tutorial).

This repo is automatically derived from our main docs repo. If you'd like to
submit a pull request -- thanks! -- please feel free to do so at
https://github.com/mongodb/docs-realm/ (see the tutorial/ subdirectory).

