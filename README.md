# Eclipse Che Native Client 
![](https://www.eclipse.org/che/images/logo-eclipseche.svg)

An extension to the Eclipse Next-Generation IDE, [Eclipse Che](https://github.com/eclipse/che) which provides seamless integration to Che and allows you to manage your Che Servers and Workspaces from a single Point of Contact.

### Get Started

This PoC currently only works with unauthenticated Che Servers, and this one especially is made to be tested with the Che Minishift Addon. To be able to run the client please start your [Minishift](https://github.com/minishift/minishift) Cluster and run your [Eclipse Che Server on Minishift](https://github.com/minishift/minishift/tree/master/addons/che).

> Once Che is installed and running on Minishift, find out the IP of your Minishift VM using the following command and note it down.
```sh
minishift ip
```

> Insert the IP of the Minishift Instance into the return statement of the `getMinishiftIp()` function which should return this IP Address as a String. This value has to be inserted in the aforementioned function, in the files below.
```sh
./src/components/App/WorkspaceDashboard/WorkspaceDashboard.tsx
./src/components/App/WorkspaceDashboard/WorkspaceCard/WorkspaceCard.tsx
```

> After doing so run the following command in the root of this repo.
```sh
npm run electron-dev
```
