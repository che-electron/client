# Eclipse Che Native Client 
![](https://www.eclipse.org/che/images/logo-eclipseche.svg)

An extension to the Eclipse Next-Generation IDE, [Eclipse Che](https://github.com/eclipse/che) which provides seamless integration to Che and allows you to manage your Che Servers and Workspaces from a single Point of Contact.

This Application allows users to add remote Che Servers. Users need to authenticate themselves if they want to add a Che Server which is not running on OpenShift. For Che Servers running on OpenShift users are authenticated through their Red Hat Developers Account.

### Building
```sh
npm install
```

### npm scripts
```npm run electron-dev``` - start development server in electron

```npm start``` - start development server in your default browser

```npm test``` - run test scripts
