# My Life
**Nombre del Proyecto:** `myLife`

**Tipo de Proyecto:** Aplicación web interactiva

**Propósito:** `myLife` es una aplicación web diseñada para simular una vida virtual. Permite a los usuarios crear un perfil, gestionar recursos y participar en actividades simuladas, como trabajar y manejar finanzas. 

### Estructura del Proyecto

- **`📁public`**:
`Coming Soon`

- **`📁src`**:
  - **`📁css`**:
    - Archivos de estilo para la aplicación, incluyendo `index.css` y `output.css`. Es recomendable consolidar estos archivos en una sola carpeta para mantener la organización.
  
  - **`📁methods`**:
    - **`📁Bank`**:
      - Contiene componentes relacionados con la funcionalidad bancaria, como `BankActions.js`, `RespModal.js`, y `TransactionHistory.js`.
      - `BankModal.js` es el componente principal del modal del banco.
  
    - **`📁Work`**:
      - Contiene componentes relacionados con la funcionalidad de trabajo. Los archivos relevantes incluyen `BtnWork.js` y `Work.js`.

  - **`📁pages`**:
    - Contiene los componentes de las páginas principales de la aplicación:
      - `accessGame.js`: Página para acceder al juego.
      - `Game.js`: Página principal del juego.
      - `UserForm.js`: Página para el formulario del usuario.
      - `Welcome.js`: Página de bienvenida.
  
  - **`index.js`**:
    - Archivo de entrada principal de la aplicación.

- **Archivos de Configuración**:
  - **`postcss.config.js`** y **`postcss.config.mjs`**: Archivos de configuración para PostCSS.
  - **`tailwind.config.js`** y **`tailwind.config.ts`**: Archivos de configuración para Tailwind CSS. Asegúrate de utilizar el formato correcto según el lenguaje que prefieras.
  - **`tsconfig.json`**: Archivo de configuración para TypeScript, si estás usando TypeScript en el proyecto.

- **Archivos del Proyecto**:
  - **`README.md`**: Documento de descripción y guía del proyecto.
  - **`.gitignore`**: Archivo para especificar qué archivos o carpetas deben ser ignorados por Git.
  - **`package.json`** y **`package-lock.json`**: Archivos de configuración para las dependencias y scripts del proyecto.

### Características

1. **Gestión del Perfil del Usuario**: Los usuarios pueden crear y gestionar su perfil, incluyendo la administración de recursos y finanzas.
  
2. **Interacción con el Banco**: La aplicación incluye un modal bancario (`BankModal`) que permite a los usuarios retirar, depositar, y prestar dinero. También mantiene un historial de transacciones y permite la gestión de deudas.

3. **Simulación de Trabajo**: Los usuarios pueden realizar trabajos virtuales, que afectan su saldo y progreso en el juego.

4. **Interfaz de Usuario**: Utiliza React para la construcción de la interfaz y Tailwind CSS para el diseño responsivo.

5. **Persistencia de Datos**: La aplicación utiliza `localStorage` y `sessionStorage` para almacenar información del usuario y transacciones.