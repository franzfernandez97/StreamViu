# Considerations
- Only src and public folder are inside this project
- To test this code you must:
1) Download and install the last version of Node

```
# Download and install fnm:
curl -o- https://fnm.vercel.app/install | bash

# Download and install Node.js:
fnm install 22

# Verify the Node.js version:
node -v # Should print "v22.13.1".

# Verify npm version:
npm -v # Should print "10.9.2".

# UPDATE NPM
npm install -g npm@latest

# Install angular
npm install -g @angular/cli

# Create a Project and give a name to the Stream App
ng new

# Once is deployed delete src folder and public in the folder project
cd angProject/
rm -rf src
rm -rf public
```

2) In the folder directory clone the repository

```
cd ../
git clone https://github.com/franzfernandez97/StreamViu.git
```

3) Copy all the info in the angProject to the StreamViu Folder

```
cp -r angProject/* StreamViu/
```

4) Enter in the StreamViu project and execute it

```
cd StreamViu/
ng serve --host=$serverDomain

```

5) Debes insertar los archivos mp3 a reproducir en la ruta de de Public/assets/songs

