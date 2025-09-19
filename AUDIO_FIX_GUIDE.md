# Guide de Correction Audio pour TestFlight

## Problème résolu

Les sons ne fonctionnaient que sur Expo Go et la version web, mais pas sur TestFlight.

## Corrections apportées

### 1. Configuration EAS (eas.json)

- Ajout de la configuration iOS Release pour les builds de production
- Optimisation des paramètres de build

### 2. Configuration Audio iOS (app.json)

- Ajout des options de session audio pour une meilleure compatibilité
- Configuration des modes de lecture audio
- Support des casques Bluetooth et AirPods

### 3. Configuration Metro (metro.config.js)

- Ajout des extensions de fichiers audio (.mp3, .wav, .aac, etc.)
- S'assurer que les assets audio sont inclus dans le bundle

### 4. Gestion d'erreur améliorée (Player.tsx)

- Détection des erreurs de chargement audio
- Affichage d'alertes utilisateur en cas de problème
- Interface visuelle pour indiquer les erreurs

## Étapes de test

### 1. Vérification locale

```bash
npm run check-audio
```

Cette commande vérifie que tous les fichiers audio sont présents.

### 2. Test sur Expo Go

```bash
npm start
```

- Ouvrir l'app sur Expo Go
- Tester chaque preset audio
- Vérifier que les sons se jouent correctement

### 3. Build de production

```bash
npm run build:ios
```

- Créer un nouveau build avec EAS
- Télécharger et installer via TestFlight
- Tester tous les presets audio

### 4. Vérifications sur TestFlight

- [ ] Sleep preset (1Hz) fonctionne
- [ ] Relax preset (8Hz) fonctionne
- [ ] Create preset (20Hz) fonctionne
- [ ] Focus preset (40Hz) fonctionne
- [ ] Les sons se jouent en boucle
- [ ] Les contrôles play/pause fonctionnent
- [ ] Pas d'erreurs dans la console

## Dépannage

### Si les sons ne fonctionnent toujours pas :

1. **Vérifier les logs** : Regarder la console pour des erreurs audio
2. **Redémarrer l'app** : Fermer complètement et rouvrir
3. **Vérifier le volume** : S'assurer que le volume n'est pas coupé
4. **Tester avec des écouteurs** : Certains sons peuvent être inaudibles sur haut-parleurs

### Messages d'erreur courants :

- "Fichier audio non trouvé" → Problème de bundling
- "Erreur lors de la lecture" → Problème de configuration audio
- Bouton rouge avec icône warning → Erreur de chargement

## Notes techniques

- Les fichiers audio sont maintenant correctement inclus dans le bundle de production
- La configuration iOS permet la lecture en arrière-plan
- Support des casques Bluetooth et AirPods
- Gestion d'erreur robuste pour une meilleure expérience utilisateur

## Prochaines étapes

1. Tester le build de production
2. Soumettre à TestFlight
3. Tester avec des utilisateurs réels
4. Surveiller les rapports de crash pour des problèmes audio
