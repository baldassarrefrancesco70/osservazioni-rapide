# Osservazioni rapide

Pagina web per registrare in classe, dall'iPad, osservazioni rapide sugli studenti (partecipazione, impegno, collaborazione, uso dei riscontri) con un tocco: vuoto → + → − → vuoto. Funziona anche senza rete e si può aggiungere alla schermata Home.

Indirizzo: https://baldassarrefrancesco70.github.io/osservazioni-rapide/

## Dove stanno i dati

I dati (classi, elenchi, osservazioni) restano **solo nella memoria del dispositivo** su cui si usa la pagina: non vengono inviati a nessun server e non sono in questo repository, che contiene soltanto l'interfaccia. Le esportazioni (`*.csv`, `osservazioni_copia_*.json`) sono escluse da `.gitignore`: non vanno mai aggiunte al repository.

## Regola per gli aggiornamenti

Ogni volta che si modifica `index.html` (o un altro file della pagina), bisogna cambiare anche il nome della cache in `sw.js`:

```js
const CACHE = 'osservazioni-v1';   // → 'osservazioni-v2', 'osservazioni-v3', …
```

Altrimenti l'iPad continua a mostrare la versione vecchia.
