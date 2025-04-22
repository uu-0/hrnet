# 💼 HRNet
#### Objectif :
Migrer une application web d'une architecture jQuery vers React.

##  Description du projet
Cette mission a été réalisée pour une société financière fictive dans le but de moderniser leur application interne.

#### 🔧 Mission principale :
Refondre les pages clés de l’application en remplaçant un plugin jQuery spécifique par un composant React.

#### 📊 Mesure de performance :
Comparer les performances avant et après la migration, afin de quantifier les bénéfices apportés par React (meilleure fluidité, chargement plus rapide, maintenabilité...).

## ⚙️ Fonctionnalités de l'application
HRNet est une application web permettant de gérer un registre d’employés.

### 👤 Création d’un employé
L’utilisateur peut renseigner les informations suivantes :

| Catégorie       | Champs                                     |
|-----------------|--------------------------------------------|
| Identité        | Prénom, Nom, Date de naissance             |
| Informations    | Poste                                      |
| Entrée          | Date d'entrée dans l'entreprise            |
| Adresse         | Rue, Ville, État, Code postal              |


### 📋 Liste des employés
Fonctionnalités du tableau :

| Type            | Champs concernés                                                  |
|-----------------|-------------------------------------------------------------------|
| 🔍 Filtre       | Prénom, Nom                                                       |
| ↕️ Tri asc/desc | Prénom, Nom, Date de naissance, Poste, Date d'entrée, Rue, Ville, État, Code postal |
| 📄 Pagination   | Nombre de résultats par page, navigation entre pages             |

## 🛠 Refactorisation des anciens plugins jQuery
Lors de la migration de l’application de jQuery vers React, plusieurs problèmes liés aux anciens plugins ont été identifiés. Voici un aperçu des principales issues rencontrées et des solutions apportées :

#### 🔹 Résumé des problèmes rencontrés

| Plugin              | Problème principal                                                              | Solution React                                        |
|---------------------|----------------------------------------------------------------------------------|--------------------------------------------------------|
| Date Picker         | Lent, parfois non réactif                                                       | `CustomDatePicker` basé sur **react-datepicker** et **MUI** |
| Fenêtre modale      | Difficile à styliser, incompatible avec le design system                        | Création d’un **package React Modal** sans dépendances |
| Menus déroulants    | Lents, incohérences d’affichage et de chargement                                | Composants **Dropdown personnalisés** sans librairies externes |
| Tableau employés    | Recharge complet à chaque ajout, lenteur notable                               | Composant **EmployeeTable** optimisé avec rendu intelligent |


#### ✨ Détail des corrections

| Plugin              | Correction technique                                                             |
|---------------------|----------------------------------------------------------------------------------|
| Date Picker         | Remplacement du plugin jQuery par un composant React utilisant `react-datepicker` et `@mui/material` pour une meilleure intégration UX et performance. |
| Fenêtre modale      | Création d’un composant `Modal` sur-mesure, publié comme package npm, stylisable librement, sans dépendance externe. |
| Menus déroulants    | Implémentation de composants React personnalisés assurant stabilité, rapidité et ordre constant des options. |
| Tableau employés    | Développement d’un composant `EmployeeTable` qui met à jour uniquement les lignes nécessaires, évitant le rechargement complet et améliorant la fluidité. |


## 🔗 Liens utiles
### 🧩 Composant modale utilisé :
Un package React personnalisé affiche une modale de confirmation ou d’erreur lors de la soumission du formulaire.

📦 package NPM : [uu0-modal-react-component](https://www.npmjs.com/package/uu0-modal-react-component)

🛠️ repository GitHub : [uu0-modal-react-component](https://github.com/uu-0/uu0-modal-react-component)

## 📊 Rapport de performances
Voici une comparaison des résultats Lighthouse avant et après la migration de l'application de jQuery vers React

#### 🔧 Page "Create Employee"
| Critère                  | jQuery | React |
|--------------------------|--------|--------|
| **Performance**          | 100    | 100    |
| **Accessibilité**        | 96     | 100    |
| **Bonnes pratiques**     | 92     | 100    |
| **SEO**                  | 90     | 100    |

#### Détails techniques :

| Statistiques                | jQuery | React  |
|-----------------------------|--------|--------|
| First Contentful Paint      | 0,5 s  | 0,4 s  |
| Largest Contentful Paint    | 0,5 s  | 0,5 s  |
| Total Blocking Time         | 0 ms   | 10 ms  |
| Cumulative Layout Shift     | 0      | 0,052  |
| Speed Index                 | 0,5 s  | 0,5 s  |



#### 📋 Page "Employee List"
| Critère                  | jQuery | React  |
|--------------------------|--------|--------|
| **Performance**          | 99     | 100    |
| **Accessibilité**        | 91     | 100    |
| **Bonnes pratiques**     | 93     | 100    |
| **SEO**                  | 90     | 100    |

#### Détails techniques :
| Statistiques                | jQuery | React  |
|-----------------------------|--------|--------|
| First Contentful Paint      | 0,6 s  | 0,4 s  |
| Largest Contentful Paint    | 0,6 s  | 0,5 s  |
| Total Blocking Time         | 0 ms   | 0 ms   |
| Cumulative Layout Shift     | 0,045  | 0,048  |
| Speed Index                 | 0,6 s  | 0,4 s  |

#### 💡 Conclusion :
La migration vers React a permis une amélioration notable de l’accessibilité, des bonnes pratiques, du SEO et une légère optimisation des performances générales, tout en conservant une bonne fluidité d’affichage.