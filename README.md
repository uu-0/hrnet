# hrnet

**objectif :** faire passer une librairie jQuery vers React

## description

>Dans ce projet, vous participerez à la conversion d’une application de jQuery vers React pour une grande société financière.
>
>- Votre mission principale sera de refondre les pages clés de l’application en remplaçant un plugin jQuery spécifique par un composant React.
Cela impliquera une compréhension approfondie des deux technologies et leur interaction.
>
>- Vous serez chargé de mesurer les performances de l'application avant et après la conversion. Cette analyse de performance vous permettra de quantifier les avantages de la migration vers React.
>
>- Vous livrerez les résultats de votre travail avec des rapports détaillés, y compris des analyses de performance et des explications sur les choix techniques effectués pendant la conversion.

## fonctionnement de l'application

L'application web HRNet est un registre d'employés, listant leurs informations.

---

Elle permet de créer un employé en indiquant :

- son prénom
- son nom
- sa date de naissance
- son poste dans l'entreprise
- sa date d'entrée dans l'entreprise
- son adresse, dont :

  - sa rue
  - sa ville
  - son état
  - son code postal

L'application permet également de lister les employés, ainsi que de réaliser différents tris et filtres :

- filtre sur le prénom ou le nom de l'employé
- tri asc/desc sur le prénom
- tri asc/desc sur le nom
- tri asc/desc sur la date de naissance
- tri asc/desc sur le poste
- tri asc/desc sur la date d'entrée
- tri asc/desc sur la rue
- tri asc/desc sur la ville
- tri asc/desc sur l'état
- tri asc/desc sur le code postal

Il est également possible pour l'utilisateur de choisir le nombre d'employé affiché sur une page du tableau des employés, et de naviguer entre ces pages.

## liens externes
HRNet utilise un package lui fournissant une modale afin d'afficher un message de succès ou d'erreur lors de la soumission du formulaire de création d'un employé. 

**le package est disponible via :** [react-modal-components-uu0](https://www.npmjs.com/package/react-modal-component-uu0) 

**repository du package :** 
[react-modal-uu0](https://github.com/uu-0/react-modal-uu0) 