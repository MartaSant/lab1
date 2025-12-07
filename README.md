# Interactive Website Playground

Un sito dimostrativo che mostra diverse tecniche di interattività web moderne, costruito con HTML, CSS e JavaScript vanilla (più React e Vue da CDN).

## 🚀 Come Avviare il Progetto

### Opzione 1: Server Locale (Consigliato)

Per testare correttamente tutte le funzionalità, specialmente le pagine React e Vue Lab che richiedono il caricamento da CDN, è consigliato usare un server locale.

#### Con Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Poi apri nel browser: `http://localhost:8000`

#### Con Node.js (http-server):
```bash
npx http-server -p 8000
```

#### Con VS Code:
Installa l'estensione "Live Server" e clicca su "Go Live" nella barra inferiore.

### Opzione 2: Apertura Diretta

Puoi anche aprire direttamente `index.html` nel browser, ma **attenzione**: 
- Alcuni CDN potrebbero non funzionare con il protocollo `file://`
- La pagina Vue Lab potrebbe non caricarsi correttamente
- La pagina React Lab potrebbe avere problemi simili

Se vedi la dashboard vuota in Vue Lab, significa che Vue non si è caricato. Controlla:
1. La console del browser (F12) per errori
2. La connessione internet (i CDN richiedono connessione)
3. Usa un server locale invece di aprire direttamente il file

## 📁 Struttura del Progetto

```
.
├── index.html                 # Pagina principale con tracciamento progresso
├── micro-interactions.html    # Demo di micro-interazioni HTML/CSS/JS
├── scroll-lab.html           # Demo di storytelling con scroll
├── react-lab.html            # Demo con React (caricato da CDN)
├── vue-lab.html              # Demo con Vue 3 (caricato da CDN)
├── styles.css                # Stili globali condivisi
├── main.js                   # Logica condivisa per tracciamento progresso
├── micro-interactions.js     # Logica per micro-interazioni
├── scroll-lab.js             # Logica per animazioni scroll
├── react-lab.js              # Componente React
└── vue-lab.js                # Applicazione Vue
```

## 🎯 Funzionalità

### 1. Tracciamento Progresso
- Usa `localStorage` per salvare le pagine visitate
- Indicatore di progresso sulla pagina principale
- Messaggio di congratulazioni quando tutte le pagine sono state visitate

### 2. Micro Interactions
- Pulsanti con cambiamenti di stato
- Carte che si girano al hover
- Toggle per cambio tema
- Tooltip interattivi
- Easter egg nascosti

### 3. Scroll Storytelling
- Animazioni attivate dallo scroll con IntersectionObserver
- Sezioni che si rivelano gradualmente
- Timeline interattiva
- Easter egg per scroll completo

### 4. React Lab
- React 18 caricato da CDN
- Configuratore di sito con anteprima live
- Gestione stato con hooks
- Calcolo dinamico dei prezzi

### 5. Vue Lab
- Vue 3 caricato da CDN
- Dashboard interattiva con filtri
- Binding reattivo dei dati
- Proprietà computate per riepiloghi

## 🛠️ Tecnologie

- **HTML5** - Struttura
- **CSS3** - Stili moderni con Flexbox/Grid, animazioni
- **JavaScript (ES6+)** - Logica vanilla
- **React 18** - Caricato da CDN (pagina React Lab)
- **Vue 3** - Caricato da CDN (pagina Vue Lab)
- **IntersectionObserver API** - Per animazioni scroll
- **LocalStorage API** - Per salvare il progresso

## 📝 Note

- **Nessun build tool richiesto** - Tutto funziona aprendo direttamente i file HTML
- **CDN necessari** - React e Vue sono caricati da CDN (richiedono connessione internet)
- **Responsive** - Design ottimizzato per mobile e desktop
- **Educational** - Codice ben commentato per scopi didattici

## 🔧 Risoluzione Problemi

### Vue Lab mostra dashboard vuota

**Causa**: Vue non si è caricato dal CDN.

**Soluzioni**:
1. ✅ Usa un server locale (vedi Opzione 1 sopra)
2. ✅ Controlla la console del browser (F12) per errori
3. ✅ Verifica la connessione internet
4. ✅ Prova a ricaricare la pagina

### React Lab non funziona

Stessa soluzione del problema Vue Lab: usa un server locale invece di aprire direttamente il file.

### Progresso non si salva

Verifica che il browser supporti `localStorage` e che non sia disabilitato. Prova in modalità normale (non incognito).

## 📄 Licenza

Progetto dimostrativo - libero per uso educativo.

