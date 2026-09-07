import { createApp } from "./server";
import { createPrismaClient } from "./lib/prisma-factory";
import { fileURLToPath } from "url";

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';

    const prisma = createPrismaClient(DATABASE_URL);
    const app = createApp(prisma);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    });
}