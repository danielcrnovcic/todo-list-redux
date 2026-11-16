# 📝 Todo List – React + Redux + Firebase

Todo aplikacija napisana pomoću **React**-a, **Redux Toolkit**-a i **Firebase**-a (Authentication + Firestore).

## Funkcionalnosti

- Prijava i registracija korisnika (email + lozinka)
- Resetovanje lozinke putem emaila
- Dodavanje novog todo-a (naslov i opis)
- Označavanje todo-a kao završenog
- Brisanje todo-a
- Filtriranje po stanju (To-Do / Done)
- Svaki korisnik vidi samo svoje todo-e

## Tehnologije

- React (Vite)
- Redux Toolkit + React Redux
- React Router
- Firebase Authentication i Cloud Firestore

## Struktura projekta

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── firebase/config.js
├── store/
│   ├── store.js
│   ├── usersSlice.js
│   └── todosSlice.js
├── components/
│   ├── Header.jsx
│   ├── FullPageLoader.jsx
│   ├── Todo.jsx / Todo.css
│   ├── TodoList.jsx
│   └── Filter.jsx / Filter.css
└── views/
    ├── TodosPage.jsx
    ├── AddTodoPage.jsx
    └── LoginPage.jsx
```

## Pokretanje projekta

### 1. Kloniranje i instalacija

```bash
git clone https://github.com/danielcrnovcic/todo-list-redux.git
cd todo-list-redux
npm install
```

### 2. Firebase

Fajl `src/firebase/config.js` je već u repozitorijumu i povezan je sa Firebase projektom, pa ovdje ništa ne moraš podešavati.

#### Korištenje vlastitog Firebase projekta (opcionalno)

1. Idi na [Firebase Console](https://console.firebase.google.com) i klikni **Add project**.
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable**.
3. **Build → Firestore Database → Create database** (Start in production mode).
4. U tabu **Rules** zalijepi sljedeće i klikni **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow create: if request.auth != null
        && request.resource.data.user_id == request.auth.uid;
      allow read, update, delete: if request.auth != null
        && resource.data.user_id == request.auth.uid;
    }
  }
}
```

5. **Project settings → Your apps → Web (`</>`)** → registruj aplikaciju i kopiraj `firebaseConfig`.
6. Upiši vrijednosti u fajl `src/firebase/config.js`.

### 3. Pokretanje

```bash
npx vite
```

Otvori adresu koju ispiše terminal (obično http://localhost:5173).

## Test nalozi

Za testiranje možeš koristiti sljedeće naloge:

| Email | Lozinka |
|---|---|
| test@gmail.com | testtest |
| test2@gmail.com | testtest |

> **Napomena:** ako prijava ne uspije, nalog još nije kreiran u Firebase projektu. Registruj ga preko opcije **Signup** u aplikaciji (ili ručno u Firebase Console → Authentication → Users → Add user), a zatim se prijavi opcijom **Login**.
>
> Opcija "Forgot Password?" neće raditi za ove adrese ako nemaš pristup tim inboxima.
