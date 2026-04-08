Correction du cours sur le storage en react native (async storage + redux persist)

### Installation
```bash
git clone https://github.com/gnvIRCAM/React-Native---Secured-Notes.git
cd React-Native---Secured-Notes
npm install
npm start
```

### Infos et structure
Pour le typage de la navigation, tout se passe dans App.tsx : on crée un type StackParamList avec, pour chaque screen, le type des params, et on utilise ce type lors de l'instanciation du navigator (dans createNativeStackNavigator). 
Pour redux : les différentes slices sont typées directement dans le fichier les contenant (voir src/store/noteSlice.tsx)