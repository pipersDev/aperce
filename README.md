# Sistema de Gestión de Tareas (TaskManager)[cite: 1]

## 🛠️ Tecnologías Utilizadas
- **Backend:** .NET 8 Web API, Entity Framework Core, Clean Architecture.[cite: 1]
- **Frontend:** Angular 21+, RxJS, Angular Signals, Reactive Forms.[cite: 1]
- **Base de Datos:** SQL Server 2022 (Soporte Nativo JSON).[cite: 1]

---

## 🚀 Pasos para ejecutar el proyecto frontend
1. descargar el proyecto
2. instalar dependencias con NPM i - install
3. Modificar los archivos de enviroments para colocar el puerto donde se levante el proyecto backend
4. con el comando npm run start levantas el proyecto en el navegador

## 🚀 Pasos para ejecutar el proyecto backend

### 1. Base de Datos
1. Ejecutar el script `script_database.sql` en SQL Server Management Studio o Azure Data Studio.
2. Actualizar la cadena de conexión en `appsettings.json` de la API Backend.

### 2. Backend (.NET)
```bash
cd TaskManager.API
dotnet restore
dotnet run
