# Formulaire Inscription - Supabase

Formulaire HTML/CSS/JavaScript pur pour collecter le nom et la ville, avec sauvegarde des données dans Supabase.

## 🚀 Fonctionnalités

- ✅ Formulaire responsive et moderne
- ✅ Validation des champs côté client
- ✅ Intégration Supabase pour la sauvegarde des données
- ✅ Messages de feedback utilisateur
- ✅ Design gradient élégant
- ✅ Animation fluide
- ✅ Prêt pour GitHub Pages

## 📋 Prérequis

- Un compte [Supabase](https://supabase.com)
- Une table `inscriptions` dans votre base de données Supabase

## 🔧 Configuration

### 1. Créer la table Supabase

Dans votre projet Supabase, créez une table `inscriptions` avec les colonnes suivantes:

```sql
CREATE TABLE inscriptions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nom TEXT NOT NULL,
    ville TEXT NOT NULL,
    date_inscription TIMESTAMP DEFAULT NOW()
);
```

### 2. Configurer les variables Supabase

Ouvrez le fichier `script.js` et remplacez les variables:

```javascript
const SUPABASE_URL = 'https://votre-projet.supabase.co';
const SUPABASE_ANON_KEY = 'votre-clé-anonyme';
```

Vous trouverez ces valeurs dans:
- **Supabase Dashboard** → **Settings** → **API**

### 3. Configurer les permissions RLS (Row Level Security)

Dans Supabase, allez à **Authentication** → **Policies** et configurez les permissions pour permettre l'insertion:

```sql
CREATE POLICY "Permettre insertion publique" ON inscriptions
FOR INSERT TO anon
WITH CHECK (true);
```

## 📁 Structure des fichiers

```
├── index.html       # Formulaire HTML
├── styles.css       # Styles CSS
├── script.js        # JavaScript avec intégration Supabase
├── config.example.js # Exemple de configuration
└── README.md        # Ce fichier
```

## 🌐 Déploiement sur GitHub Pages

### Option 1: Utiliser les paramètres du repository

1. Allez dans **Settings** → **Pages**
2. Sous "Source", sélectionnez "Deploy from a branch"
3. Sélectionnez la branche `main` et le dossier `/root`
4. Cliquez sur "Save"

Le site sera accessible à: `https://Kalihf23.github.io/terfre/`

### Option 2: Utiliser GitHub Actions

Créez un fichier `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        run: echo "Site deployed!"
```

## 🔐 Sécurité

⚠️ **Important**: Ne committez jamais vos clés Supabase directement dans le repository public!

### Utiliser des variables d'environnement:

```javascript
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
```

Ou utilisez GitHub Secrets pour un déploiement avec GitHub Actions.

## 📝 Utilisation

1. Ouvrez `index.html` dans un navigateur
2. Remplissez le formulaire avec votre nom et votre ville
3. Cliquez sur "Envoyer"
4. Les données sont automatiquement sauvegardées dans Supabase

## 🎨 Personnalisation

### Modifier les couleurs

Editez `styles.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Ajouter des champs

1. Dans `index.html`, ajoutez un nouveau `form-group`:

```html
<div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
</div>
```

2. Dans `script.js`, collectez la valeur:

```javascript
const email = document.getElementById('email').value.trim();
```

3. Ajoutez-la à l'insert Supabase:

```javascript
.insert([{
    nom: nom,
    ville: ville,
    email: email,
    date_inscription: new Date().toISOString()
}])
```

## 🐛 Dépannage

**Erreur: "Erreur: Cannot read property 'supabase' of undefined"**
- Vérifiez que le script Supabase CDN est chargé correctement
- Vérifiez votre URL et clé Supabase

**Erreur: "Permission denied"**
- Vérifiez les politiques RLS dans Supabase
- Assurez-vous que la table accepte les insertions publiques

**Les données ne s'enregistrent pas**
- Vérifiez le nom de la table dans `script.js`
- Vérifiez que les colonnes correspondent

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide GitHub Pages](https://docs.github.com/en/pages)
- [MDN - Web Forms](https://developer.mozilla.org/en-US/docs/Learn/Forms)

## 📄 Licence

MIT

## 👨‍💻 Auteur

Créé pour Kalihf23
