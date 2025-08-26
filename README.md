# Milestone PMO (Spring Boot + React)

**Backend**: Spring Boot 3.2.5, JWT auth, JPA (Postgres), Excel upload endpoints  
**Frontend**: Vite + React 18 (theme #0b9e3a & white), login, upload widgets, dashboard

## DB
Connection: `postgresql://postgres:admin123@localhost:5432/postgres?schema=milestone`  
Spring JDBC: `jdbc:postgresql://localhost:5432/postgres?currentSchema=milestone`  
Create schema first:
```sql
CREATE SCHEMA IF NOT EXISTS milestone;
```

## Run
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend
cd ../frontend
npm install
npm run dev
```
Login: **admin@example.com / admin123** (auto-created)

## Upload formats
- **Projects & Tasks**: `PROJECT,TASK,"ASSIGNED TO",COMPLETION %,START,END,DAYS,Comments`
- **Changes**: `patch/code Version,Type(Patch/DM/CodeDrop),Jira ref,Environments,Deployed-date,"manifest file name"`
- **Testing Tasks**: `"Test case","Defect number","Completion status",target date, Comments`

## Endpoints
- `POST /api/auth/register`, `POST /api/auth/login`
- `POST /api/upload/projects-tasks` (`file=.xlsx`)
- `POST /api/upload/changes` (`file=.xlsx`)
- `POST /api/upload/tests` (`file=.xlsx`)
- `GET /api/dashboard/summary`
