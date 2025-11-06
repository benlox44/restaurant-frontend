# Instrucciones para conectar Frontend con API Gateway

## ✅ Configuración Completada

### Archivos creados/modificados:

1. **Configuración de Apollo Client**
   - `src/config/apollo-client.ts` - Cliente GraphQL configurado
   - `.env` - Variables de entorno

2. **GraphQL Mutations y Queries**
   - `src/graphql/mutations/auth.ts` - Mutaciones de autenticación
   - `src/graphql/queries/user.ts` - Queries de usuario

3. **Tipos TypeScript**
   - `src/types/graphql.ts` - Tipos para las respuestas de GraphQL

4. **Componentes actualizados**
   - `src/main.tsx` - ApolloProvider agregado
   - `src/pages/Register.tsx` - Integración completa con GraphQL
   - `src/pages/ConfirmAccount.tsx` - Página de confirmación mejorada

## 🚀 Pasos para ejecutar

### 1. Iniciar el microservicio de Auth (ya corriendo)
```bash
cd restaurant-auth
docker-compose -f docker-compose.dev.yml up -d
```

### 2. Iniciar el API Gateway
```bash
cd restaurant-api
npm install
npm run start:dev
```
El API Gateway correrá en: `http://localhost:3000/graphql`

### 3. Iniciar el Frontend
```bash
cd restaurant-frontend
npm run dev
```
El Frontend correrá en: `http://localhost:5173`

## 🔍 Verificar la conexión

### GraphQL Playground
Abre `http://localhost:3000/graphql` y prueba esta mutación:

```graphql
mutation {
  register(
    email: "test@example.com"
    password: "password123"
    name: "Test User"
  ) {
    message
  }
}
```

### Desde el Frontend
1. Ve a `http://localhost:5173/register`
2. Llena el formulario de registro
3. Al hacer submit:
   - Se enviará la mutación al API Gateway
   - El API Gateway se comunicará con el microservicio Auth vía gRPC
   - Si es exitoso, se redirigirá a `/confirm-account`
   - Si hay error, se mostrará un mensaje de error

## 📡 Flujo de datos

```
Frontend (React + Apollo Client)
    ↓ GraphQL HTTP
API Gateway (NestJS + GraphQL) :3000
    ↓ gRPC
Microservicio Auth (NestJS) :50051
    ↓
PostgreSQL + Redis
```

## 🎯 Funcionalidades disponibles

### Mutations:
- ✅ `register` - Registro de usuario
- ✅ `login` - Inicio de sesión
- ✅ `requestPasswordReset` - Solicitar reset de contraseña
- ✅ `resetPassword` - Resetear contraseña
- ✅ `confirmEmail` - Confirmar email

### Queries:
- ✅ `myProfile` - Obtener perfil del usuario

## 🔐 Autenticación

El token JWT se guarda en `localStorage` con la key `accessToken` y se incluye automáticamente en todas las peticiones subsecuentes mediante el `authLink` de Apollo Client.

## 🐛 Troubleshooting

### Si el registro no funciona:
1. Verifica que el API Gateway esté corriendo
2. Verifica que el microservicio Auth esté corriendo
3. Revisa la consola del navegador para errores
4. Verifica la configuración CORS en `restaurant-api/src/main.ts`

### Error de conexión gRPC:
- Asegúrate que Docker esté corriendo
- Verifica que el puerto 50051 esté disponible
- Revisa los logs del contenedor Auth

## 📝 Variables de entorno

### Frontend (.env)
```
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

### API Gateway (.env)
```
AUTH_SERVICE_URL=localhost:50051
FRONTEND_URL=http://localhost:5173
PORT=3000
```
